var fs = require('fs')
var path = require('path')

var defaultTarget = 'common-module'
var defaultDeep = 3

function getPath (option) {
  option = option || {}

  this.target = this.target || defaultTarget
  this.deep = this.deep || defaultDeep
  this.curPath = this.curPath || __dirname

  option.prefix = option.prefix || ''

  if (!this.deep) return new Error('over deep ' + this.deep)

  this.curPath = path.join(this.curPath, option.prefix)

  var arr = fs.readdirSync(this.curPath)
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === this.target) {
      return path.join(this.curPath, this.target)
    }
  }

  this.deep--

  return getPath.bind(this)({ prefix: '..' })
}

var backend = {
  getPathNodeModules (option) {
    option = option || {}
    option.target = option.target || 'node_modules'
    return getPath.bind(option)({
      prefix: option.prefix
    })
  },
  resolve (sub, option) {
    sub = sub || ''
    option = option || {}
    return path.join(getPath.bind(option)({
      prefix: option.prefix
    }), sub)
  }
}

;(function () {
  var options = {
    target: process.argv[2],
    deep: process.argv[3]
  }
  var nodeModulesPath = backend.getPathNodeModules(options)
  console.log(nodeModulesPath)
})()

module.exports = backend
