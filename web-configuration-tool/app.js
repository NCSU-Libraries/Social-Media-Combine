var express    = require('express');
var bodyparser = require('body-parser');
var exec       = require('child_process').exec;
var fs         = require('fs');
var YAML       = require('yamljs');
var lentil_cfg = '/src/lentil/lentil_config.yml';
var sfm_cfg    = '/src/sfm/sfm_config.txt';
var app        = express();

app.use('/',express.static(__dirname));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.post('/Submit',function(request,response){
  var jsonString = JSON.stringify(request.body);
  var jsonObj    = JSON.parse(jsonString);

  fs.unlinkSync(lentil_cfg);
  fs.unlinkSync(sfm_cfg);

  fs.appendFileSync(lentil_cfg, "defaults: &defaults\n\n");

  for (var myKey in jsonObj) {
    if (myKey.search("SFM") != -1) {
      fs.appendFileSync(sfm_cfg, myKey + "=" + jsonObj[myKey] + "\n");
    } else {
      fs.appendFileSync(lentil_cfg, "   " + myKey + ": \"" + jsonObj[myKey] + "\"\n\n");
    }
  }

  fs.appendFileSync(lentil_cfg, "development:\n  <<: *defaults\n\n");
  fs.appendFileSync(lentil_cfg, "test:\n  <<: *defaults\n\n");
  fs.appendFileSync(lentil_cfg, "staging:\n  <<: *defaults\n\n");
  fs.appendFileSync(lentil_cfg, "production:\n  <<: *defaults\n\n");

  exec('sh commit.sh');
  exec('sh reconfig.sh');

  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  response.end('Hello, World!');
});

app.get('/configData', function (req, res){
  var committed = YAML.load('/src/web-configuration-tool/committed/values.txt');
  res.send(committed);
});

var server=app.listen(8080,function(){
  exec('sh commit.sh');
  console.log("We have started our server on port 8080");
});
