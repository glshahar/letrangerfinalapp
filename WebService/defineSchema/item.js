var mongoose =require('mongoose');
var schema = mongoose.Schema;

var itemSchema = new schema({
	name: "string",
	price: "string",
	designer: "string",
	new: Boolean,
	like_counter: Number,
	img_url: "string",
	categories: [],
	id: {type:"string", index:1, required:true, unique:true},
}, {collection: 'products'});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;