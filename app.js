var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var nocache = require('nocache')
app.use(nocache())

try {
  app.use(bodyParser.urlencoded({ extended: false
    , limit: '5mb'
  }));
  app.use(bodyParser.json({
    limit: '5mb'
  }));
  app.use(cookieParser());
}
catch (e) {
  console.log(e);
}

app.use(function (req, res, next) {
  try{
    console.log("request filename ");
    var filename = path.basename(req.url);
    var extension = path.extname(filename) || "";
    extension = extension.toLowerCase();
    if (extension === '.css'){
        console.log("  The css file " + filename + " was requested.");
    }
    if (extension === '.png' || extension === '.jpg' || extension === '.jpeg'){
        console.log("  The image file " + filename + " was requested.");
    }
  } catch(e){
    console.log(e);
  }
  
    next();
});

app.use('/static', express.static(__dirname + '/public'));

// app.all('*', function (req, res, next) {
//   next();
// });


app.get('/', function (req, res) {
  var data = {status: 'succ'};
  res.send(data);
});

  
//Start listening 5000
app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
  console.log('dir:' + __dirname);
});
