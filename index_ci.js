#!/usr/bin/env node

var crossEnv = require('cross-env')

var upperCm = require('./index.js')

var args = process.argv.slice(2)
var argsOther = process.argv.slice(2)
var argsNext = []
var options = (function () {
  var str = args[0]
  var arr = []
  if (str && str.indexOf('-uc:') !== -1) {
    str = str.replace('-uc:', '')
    arr = str.split(',')
  }
  if (arr.length) {
    argsOther = process.argv.slice(3)
  }
  return {
    deep: arr[0],
    target: arr[1]
  }
})()

var result = upperCm.getPathNodeModules(options)

argsNext.push('NODE_PATH=' + result)

for (var i = 0; i < argsOther.length; i++) {
  argsNext.push(argsOther[i])
}

crossEnv(argsNext)
