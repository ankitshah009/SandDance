const fs = require('fs');
fs.copyFileSync('./dist/css/sanddance.css', '../../docs/dist/sanddance/v1/sanddance.css');
fs.copyFileSync('./dist/umd/sanddance.js', '../../docs/dist/sanddance/v1/sanddance.js');
