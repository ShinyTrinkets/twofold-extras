const code = require('./code')
const fs = require('./fs')
const os = require('./os')
const request = require('./request')
const time = require('./time')

module.exports = {...code, ...fs, ...os, ...request, ...time}
