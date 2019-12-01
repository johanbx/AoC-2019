const path = require('path');
const fs = require('fs');

const thisFile = path.basename(__filename);

module.exports = fs
.readdirSync(__dirname)
.filter(file => file !== thisFile)
.reduce((acc, curr) => {
  acc[path.parse(curr).name] = 
    fs.readFileSync(path.join(__dirname, curr), 'utf-8')
  return acc;
}, {});
