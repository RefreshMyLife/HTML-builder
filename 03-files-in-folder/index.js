const fs = require('fs');
const path = require('path');
let directory = path.join(path.dirname(__filename), './secret-folder');

let dirBuf = Buffer.from(directory);

fs.readdir(dirBuf, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err.message);
  } else {
    files.forEach((filesEntry) => {
      if (filesEntry.isFile() && !filesEntry.isDirectory()) {
        let dirFile = path.join(directory, filesEntry.name.toString());
        let extensionName = path.extname(filesEntry.name);
        let fileName = path.basename(dirFile, extensionName);
        fs.stat(dirFile, (err, stats) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log(
              fileName + ' - ' + path.extname(filesEntry.name) + ' - ' + stats.size + ' bytes',
            );
            console.log();
          }
        });
      }
    });
  }
});
