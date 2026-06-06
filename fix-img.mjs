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

  // 1. Remove the broken JSX comments
  if (content.includes('{/* eslint-disable-next-line @next/next/no-img-element */}')) {
    content = content.replace(/\{\/\* eslint-disable-next-line @next\/next\/no-img-element \*\/}\n/g, '');
  }

  // 2. Add top-level file disable if <img> is present
  if (content.includes('<img ') && !content.includes('eslint-disable @next/next/no-img-element')) {
    content = '/* eslint-disable @next/next/no-img-element */\n' + content;
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed ${file}`);
  }
});
