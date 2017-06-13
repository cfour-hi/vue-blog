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

  var token = '"f4a8a1c4745930812568cea904f765c68ab412c5"'

  if (buf.indexOf(token)) {
    buf = buf.toString().replace(token, '"f4a8a1c4745930812568"+"cea904f765c68ab412c5"')

    fs.writeFileSync(appFileName, buf)

    console.log('Success: modify token success!')
  } else {
    console.error('Error: Not find metched token!')
  }
}
