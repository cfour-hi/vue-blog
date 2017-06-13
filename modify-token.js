module.exports = function () {
  var fs = require('fs')

  var files = fs.readdirSync('./dist/static/js')

  var appFileName = null
  for (var i = files.length - 1; i >= 0; i--) {
    if (/^app\.\w+\.js$/.test(files[i])) {
      appFileName = files[i]
      break
    }
  }

  if (!appFileName) return console.error('Error: Modify the token failed because the file does not match!')

  appFileName = './dist/static/js/' + appFileName

  var buf = fs.readFileSync(appFileName, { encoding: 'utf8' })

  var token1 = '12f420ed696dd63fb9eb'
  var token2 = '7702ac5a64061bad1315'
  var token = token1 + token2

  if (buf.indexOf(token)) {
    buf = buf.toString().replace(token, token1 + '"+"' + token2)

    fs.writeFileSync(appFileName, buf)

    console.log('Success: modify token success!')
  } else {
    console.error('Error: Not find metched token!')
  }
}
