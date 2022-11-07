const fs = require('fs');
const path = require('path');
let directory = path.join(path.dirname(__filename), '/files-copy');
let sourseDir = path.join(path.dirname(__filename), '/files');
let dirBuf = Buffer.from(sourseDir);

fs.mkdir(directory, { recursive: true }, (err) => {
  if (err) throw err;
});

function callback(err) {
  if (err) throw err;
  console.log('source was copied to destination');
}

fs.readdir(dirBuf, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err.message);
  } else {
    files.forEach((filesEntry) => {
      if (filesEntry.isFile()) {
        let sourseFile = path.join(sourseDir, filesEntry.name.toString());
        let distFile = path.join(directory, filesEntry.name.toString());
        // console.log(distFile);
        fs.copyFile(sourseFile, distFile, callback);
      }
    });
  }
});
