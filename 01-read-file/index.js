const fs = require('fs');

const path = require('path');
const readStream = fs.createReadStream(path.join(path.dirname(__filename), './text.txt'));

readStream.on('data', (chunk) => {
  console.log('New Chunk -------------');
  console.log(chunk.toString());
});
