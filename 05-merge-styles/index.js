const fs = require('fs');
const path = require('path');
let distanationDir = path.join(path.dirname(__filename), '/project-dist');
let sourseDir = path.join(path.dirname(__filename), '/styles');
let distFile = path.join(distanationDir, 'bundle.css');

const writeStream = fs.createWriteStream(distFile);
let dirBuf = Buffer.from(sourseDir);
fs.mkdir(distanationDir, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(dirBuf, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err.message);
  } else {
    files.forEach((filesEntry) => {
      if (filesEntry.isFile()) {
        let sourseFile = path.join(sourseDir, filesEntry.name.toString());
        const readStream = fs.createReadStream(sourseFile);
        if (path.extname(filesEntry.name) === '.css') {
          readStream.on('data', (chunk) => {
            writeStream.write(chunk.toString());
          });
        }
      }
    });
  }
});
