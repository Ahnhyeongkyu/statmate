const fs = require('fs');
const base = 'C:/Users/anHye/Documents/products/statmate/content/blog/ja';

function write(name, content) {
  const p = base + '/' + name;
  fs.writeFileSync(p, content, 'utf-8');
  const lines = content.split('
').length;
  console.log(name + ': ' + fs.statSync(p).size + ' bytes, ' + lines + ' lines');
}

