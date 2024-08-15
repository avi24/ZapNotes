const os = require('os');
const path = require('path');
const { add, subtract } = require('./modules/operations')



const fullPath = path.join(__dirname, 'public', 'images', 'logo.png');
console.log(fullPath); // Outputs: /home/user/project/public/images/logo.png

const platform = os.platform();
const arch = os.arch();
console.log(platform);
console.log(arch);

const sum = add(2,3)

console.log(`The addition of 2 and 3 is ${sum}`);