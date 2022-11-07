const fs = require('fs');
const readline = require('readline');
const path = require('path');
const writeStream = fs.createWriteStream(path.join(path.dirname(__filename), './text.txt'));
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Введите текст для записи:',
});
rl.prompt();
rl.on('line', (text) => {
  writeStream.write(text);
  rl.prompt();
  if (text === 'exit') {
    console.log('BYE!');
    rl.close();
  }
}).on('SIGINT', () => {
  rl.prompt(null);
  console.log('BYE!');
  rl.close();
});
