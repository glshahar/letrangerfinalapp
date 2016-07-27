var mongoose = require('mongoose');
var bodyParser  = require('body-parser');

// Schemes / Collections
var Item = require('./defineSchema/item');
var User = require('./defineSchema/user');
var Category = require('./defineSchema/category');


// Get All Items
exports.getAllItems = function(req, res){
	Item.find({}).
	where('name').ne('').
	exec(function(err, docs){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		return res.json(docs);
	});
}

// Get All Designers
exports.getAllDesigners = function(req, res){
	User.find({}).
	where('designer').ne(false).
	exec(function(err, docs){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		return res.json(docs);
	});
}

// Get All Categories
exports.getAllCategories = function(req, res){
	Category.find({}).
	where('name').ne('').
	exec(function(err, docs){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		return res.json(docs);
	});
}

// Get All Likes
exports.getAllLikes = function(req, res){
	console.log(req.body);
	Item.find({}).
	where('id').in((req.body)). 
	exec(function(err, docs){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		if(!docs){
			console.log("not found");
			return;
		}
		console.log(docs);
		return res.json(docs);
	});
}



// Set New User /: un + pass + email
exports.setNewUser = function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	console.log("Register New User.. "+email+" "+password+"");

	var newuser = new User();
	newuser.username = username;
	newuser.password = password;
	newuser.email = email;
	newuser.designer = false;

	newuser.save(function(err, savedUser){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		console.log("usernane is taken");
		return res.status(200).send(savedUser);
	})
};

// Check Login /: un + pass
exports.checkLogin = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	console.log("Checking Login.. "+email+" "+password+"");

	var query = User.findOne({}).where('email').equals(email). 
								 where('password').equals(password).
								 exec (function(err, user){
	if(err){
		console.log(err);
		return res.status(500).send();
	}
	if(!user){
		console.log("Email / Password Incorrect");
		return res.status(404).send();
	}
	useremail = email;
	console.log("Connected Successfully");
	return res.status(200).send(user);
	})
};

// Add to My Favorites /: itemId
exports.addToFavorites = function(req, res) {
    var productId = req.body.itemId; 
    var email = req.body.email;
    console.log("Adding Product: "+productId+" to.. "+email+" Favorits");

    User.update({ $push: { likes: productId } }).where('email').equals(email).exec (function(err, user){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		console.log("Added to Favorites of: "+email+" Successfully");
		return res.status(200).send();
	});

	Item.update({$inc: {like_counter: 1}}).where('id').equals(productId).exec (function(err, user){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		if(!user){
			console.log("Please Login");
			return res.status(404).send();
		}
		console.log("Adding Like to Item: "+productId+" Successfully");
		return res.status(200).send();
	});
};


// Add New Product (designer)
exports.addNewProduct = function(req, res){
	var name = req.body.name;
	var price = req.body.price;
	var id = req.body.id;
	var designer = req.body.designer;
	var img_url = req.body.img_url;
	var like_counter = 0;
	console.log("Add New Image.. "+img_url+" of "+designer+"");

	var newitem = new Item();
	newitem.name = name;
	newitem.price = price;
	newitem.id = id;
	newitem.designer = designer;
	newitem.new = true;
	newitem.img_url = img_url;
	newitem.like_counter = like_counter;


	newitem.save(function(err, savedItem){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		console.log("usernane is taken");
		return res.status(200).send(savedItem);
	})
}
