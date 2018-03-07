var crossEnv = require('cross-env')

var upperCm = require('./index.js')

var args = process.argv.slice(2)
var argsOther = process.argv.slice(4)
var argsNext = []

var options = {
  target: args[0],
  deep: args[1]
}

var result = upperCm.getPathNodeModules(options)

argsNext.push('NODE_PATH=' + result)

for (var i = 0; i < argsOther.length; i++) {
  argsNext.push(argsOther[i])
}

crossEnv(argsNext)
