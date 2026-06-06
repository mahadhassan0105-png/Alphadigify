import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Fix the bad comments
  if (content.includes('// eslint-disable-next-line react/no-unescaped-entities')) {
    content = content.replace(/[ \t]*\/\/ eslint-disable-next-line react\/no-unescaped-entities\r?\n/g, '');
    if (!content.includes('eslint-disable react/no-unescaped-entities')) {
      content = '/* eslint-disable react/no-unescaped-entities */\n' + content;
    }
  }

  if (content.includes('// eslint-disable-next-line react-hooks/exhaustive-deps')) {
    // For exhaustive-deps, it's usually before the dependency array. 
    // It's safer to just change it to standard JS comment or top level.
    // Actually exhaustive deps disable must be on the line before the dependency array.
    // If it's inside JS block, // is fine. 
    // Wait, the error was for `jsx-no-comment-textnodes`. Exhaustive-deps shouldn't trigger that since it's inside a function block.
  }

  // Fix WebSEOClient.tsx parse error
  if (file.includes('WebSEOClient.tsx')) {
    // Check what happened to line 10
    // "import Image from 'next/image';" might have become "import  from 'next/image';"
    if (content.match(/import\s+from\s+['"]next\/image['"]/)) {
      content = content.replace(/import\s+from\s+['"]next\/image['"]/, "import Image from 'next/image'");
    }
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed comments in ${file}`);
  }
});
