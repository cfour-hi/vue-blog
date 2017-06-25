module.exports = function () {
  var fs = require('fs')

  var files = fs.readdirSync('./dist/static/js')
  var token1 = '960b2bc08394b9cbde97'
  var token2 = '3ec1b446c9846f71eff2'
  var token = token1 + token2


  for (var i = files.length - 1; i >= 0; i--) {
    var appFileName = './dist/static/js/' + files[i]
    var buf = fs.readFileSync(appFileName, { encoding: 'utf8' })

    if (buf.indexOf(token) > -1) {
      buf = buf.toString().replace(token, token1 + '"+"' + token2)
      fs.writeFileSync(appFileName, buf)
      return console.log('Success: modify token success!')
    }
  }
}
