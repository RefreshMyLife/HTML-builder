const fs = require('fs');
const path = require('path');
const readline = require('readline');

let distanationDir = path.join(path.dirname(__filename), '/project-dist');
let componentDir = path.join(path.dirname(__filename), '/components');
let stylesDir = path.join(path.dirname(__filename), '/styles');
let distFileHtml = path.join(distanationDir, 'index.html');
const templateFileHtml = path.join(path.dirname(__filename), 'template.html');

let dirBuf = Buffer.from(stylesDir);
const readStreamHeader = fs.createReadStream(path.join(componentDir, '/header.html'));
const readStreamArticle = fs.createReadStream(path.join(componentDir, '/articles.html'));
const readStreamFooter = fs.createReadStream(path.join(componentDir, '/footer.html'));
const writeStream = fs.createWriteStream(distFileHtml);

const readInterface = readline.createInterface({
  input: fs.createReadStream(templateFileHtml),
  output: process.stdout,
  console: false,
});

fs.mkdir(distanationDir, { recursive: true }, (err) => {
  if (err) throw err;
});

readInterface.on('line', function (line) {
  if (line.includes('{{header}}')) {
    readStreamHeader.pipe(writeStream);
    // readStreamHeader.on('data', (chunk) => {
    //   writeStream.write(chunk.toString());
    // });
  } else if (line.includes('{{articles}}')) {
    readStreamArticle.on('data', (chunk) => {
      writeStream.write(chunk.toString());
    });
  } else if (line.includes('{{footer}}')) {
    readStreamFooter.on('data', (chunk) => {
      writeStream.write(chunk.toString());
    });
  } else {
    writeStream.write(line);
  }
});

// fs.readdir(dirBuf, { withFileTypes: true }, (err, files) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     files.forEach((filesEntry) => {
//       if (filesEntry.isFile()) {
//         let sourseFile = path.join(sourseDir, filesEntry.name.toString());
//         const readStream = fs.createReadStream(sourseFile);
//         if (path.extname(filesEntry.name) === '.css') {
//           readStream.on('data', (chunk) => {
//             writeStream.write(chunk.toString());
//           });
//         }
//       }
//     });
//   }
// });
