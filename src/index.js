const code = require('./code')
const fs = require('./fs')
const os = require('./os')
const macos = require('./macos')
const request = require('./request')
const time = require('./time')

module.exports = {...code, ...fs, ...os, ...macos, ...request, ...time}
