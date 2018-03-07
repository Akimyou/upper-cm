var fs = require('fs')
var path = require('path')

var defaultTarget = 'common-module'
var defaultDeep = 3

function getPath (option, recursive) {
  option = option || {}
  option.prefix = option.prefix || ''

  if (!recursive) {
    this.target = this.target || defaultTarget
    this.deep = this.deep || defaultDeep
    this.initDeep = this.deep
    this.curPath = this.curPath || __dirname
  }

  if (!this.deep) return new Error('over deep ' + this.initDeep)

  this.curPath = path.join(this.curPath, option.prefix)

  var arr = fs.readdirSync(this.curPath)
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === this.target) {
      return path.join(this.curPath, this.target)
    }
  }

  this.deep--
  return getPath.bind(this)({ prefix: '..' }, true)
}

var backend = {
  getPathNodeModules (option) {
    option = option || {}
    option.target = option.target || 'node_modules'
    var temp = getPath.bind(option)({
      prefix: option.prefix
    })
    if (typeof temp === 'string') {
      return temp
    } else {
      console.error(temp)
    }
  },
  resolve (sub, option) {
    sub = sub || ''
    option = option || {}
    var temp = getPath.bind(option)({
      prefix: option.prefix
    })
    if (typeof temp === 'string') {
      return path.join(temp, sub)
    } else {
      console.error(temp)
    }
  }
}

module.exports = backend
