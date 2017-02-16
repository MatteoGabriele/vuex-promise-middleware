var pack = require('../package.json')
var version = pack.version

module.exports = '/*!\n' + ' * ' + pack.name + ' v' + version + '\n'
  + ' * (c) ' + new Date().getFullYear() + ' ' + pack.author.name + '\n'
  + ' * Released under the ' + pack.license + ' License.\n'
  + ' */'
