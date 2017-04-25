var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts')
var fs = require('fs')
var teamCreated = false;
app.set('view engine', 'ejs');  // Let Express know we want to use EJS.
app.use(expressLayouts)
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (request, response) {
  response.render('index');
})

app.use(express.static('public'));  //tell Express that well keep files in the /public directory

app.get('/test', function (request, response) {
  response.render('test');
})

app.post('/team', function(request, response){
  var responses = request.body

  //open the data.json file, and parse into a JSON Object
  var rawFile = fs.readFileSync('data.json')
  console.log("rawFile:", rawFile.length);
  if (rawFile.length != 0){
    var teamUpdates = JSON.parse(rawFile)
  }
  else {
    var teamUpdates = [{}]
  }


  teamUpdates.push(responses)
  console.log(typeof responses)
  console.log(responses.team);
  //time to save the data back to disk
  fs.writeFileSync('data.json', JSON.stringify(teamUpdates))
  response.render('team', {allTeams: responses})
});

app.listen(3000, function () {
 console.log('Example app listening on port 3000!')
})

app.get('/team', function (request, response) {
  var rawFile = fs.readFileSync('data.json')
  var teamUpdates = JSON.parse(rawFile)
  response.render('team', {allTeams: teamUpdates[teamUpdates.length-1]})
})
