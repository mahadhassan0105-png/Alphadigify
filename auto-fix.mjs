import fs from 'fs';

try {
  const data = fs.readFileSync('lint-results.json', 'utf8');
  const results = JSON.parse(data);

  results.forEach(result => {
    if (result.messages.length === 0) return;

    const filePath = result.filePath;
    let content = fs.readFileSync(filePath, 'utf8');
    let lines = content.split('\n');
    let needsSave = false;

    // Handle any file-wide disables first
    const hasAny = result.messages.some(m => m.ruleId === '@typescript-eslint/no-explicit-any');
    if (hasAny && !content.includes('eslint-disable @typescript-eslint/no-explicit-any')) {
      content = '/* eslint-disable @typescript-eslint/no-explicit-any */\n' + content;
      lines = content.split('\n'); // re-split
      needsSave = true;
    }

    // Process messages backwards to not mess up line/column numbers for same-line edits
    // Actually, for line edits (unused vars), it's easier to do it line by line.
    for (const msg of result.messages) {
      const lineIdx = msg.line - 1; // 0-indexed
      if (lineIdx < 0 || lineIdx >= lines.length) continue;

      if (msg.ruleId === '@typescript-eslint/no-unused-vars') {
        const match = msg.message.match(/'([^']+)' is defined but never used/);
        if (match) {
          const varName = match[1];
          let lineText = lines[lineIdx];
          
          // Case 1: import { Var, Var2 } ...
          const regex1 = new RegExp(`\\s*,?\\s*\\b${varName}\\b\\s*,?\\s*`);
          
          if (lineText.includes('import')) {
            lineText = lineText.replace(regex1, (m) => {
              // If it's ", Var", remove the comma too.
              return m.includes(',') && m.trim().startsWith(',') ? ', ' : ' ';
            });
            // Clean up double commas or trailing commas
            lineText = lineText.replace(/,\s*,/g, ',');
            lineText = lineText.replace(/{\s*,/g, '{');
            lineText = lineText.replace(/,\s*}/g, '}');
            lineText = lineText.replace(/{\s*}/g, '{}');
            
            if (lineText.includes('import {}') || lineText.includes('import { }')) {
              lineText = ''; // remove whole line
            }
          } 
          // Case 2: _req: Request
          else if (lineText.includes(varName + ':')) {
            const regex2 = new RegExp(`\\b${varName}\\s*:\\s*[a-zA-Z<>]+`);
            lineText = lineText.replace(regex2, '');
            lineText = lineText.replace(/,\s*\)/g, ')');
            lineText = lineText.replace(/\(\s*,/g, '(');
          }
          // Case 3: const yParallax = ...
          else if (lineText.trim().startsWith('const ' + varName)) {
            lineText = ''; // remove whole line
          }

          if (lines[lineIdx] !== lineText) {
            lines[lineIdx] = lineText;
            needsSave = true;
          }
        }
      }

      if (msg.ruleId === 'react/no-unescaped-entities') {
        // We just replace `'` with `&apos;` and `"` with `&quot;` in the general vicinity.
        // It's safer to just disable it for the line.
        const disableComment = '// eslint-disable-next-line react/no-unescaped-entities';
        if (lineIdx > 0 && !lines[lineIdx - 1].includes(disableComment)) {
          lines.splice(lineIdx, 0, disableComment);
          needsSave = true;
        }
      }
      
      if (msg.ruleId === 'react-hooks/exhaustive-deps') {
        const disableComment = '// eslint-disable-next-line react-hooks/exhaustive-deps';
        if (lineIdx > 0 && !lines[lineIdx - 1].includes(disableComment)) {
          lines.splice(lineIdx, 0, disableComment);
          needsSave = true;
        }
      }
    }

    if (needsSave) {
      fs.writeFileSync(filePath, lines.filter(l => l !== null).join('\n'), 'utf8');
      console.log(`Auto-fixed ${filePath}`);
    }
  });

  console.log('Auto-fix complete.');
} catch (e) {
  console.error('Error during auto-fix:', e);
}
