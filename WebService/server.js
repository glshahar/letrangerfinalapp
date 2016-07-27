var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var db = require('./dbController');
var port = process.env.PORT || 3000;
var fs = require('fs');
var User = require('./defineSchema/user');


/*** Server settings ***/
app.use('/', express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.set("Content-Type", "application/json");
	next();
});


/*** All routes ***/
app.get('/getAllItems', db.getAllItems);
app.get('/getAllDesigners', db.getAllDesigners);
app.get('/getAllCategories', db.getAllCategories);

app.post('/register', db.setNewUser);
app.post('/login', db.checkLogin);

app.post('/getAllLikes', db.getAllLikes);
app.post('/addToFavorites', db.addToFavorites);
app.post('/addNewProduct', db.addNewProduct);

//app.get('/ws_todo/addProduct', db.addData);
//app.get('/ws_todo/saveActionsData', db.saveData);

app.listen(port);
console.log("listening on port " + port);