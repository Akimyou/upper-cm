var upperCm = require('./index.js')

var options = {
  target: process.argv[2],
  deep: process.argv[3]
}

var result = upperCm.getPathNodeModules(options)

console.log(result)
