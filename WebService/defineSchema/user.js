var mongoose =require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
	username: {type: "string", unique: true},
	password: "string",
	email: "string",
	designer: Boolean,
	likes: [],
	//id: {type:"string", index:1, required:true, unique:true},
}, {collection: 'users'});

var User = mongoose.model('User', userSchema);

module.exports = User;