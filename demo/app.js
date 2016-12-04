var express = require('express')
var app = express();

app.use(express.static('demo'));
app.use('/dist', express.static('dist'))

app.listen(3333, function () {
  console.log('Example app listening on port 3001!')
})