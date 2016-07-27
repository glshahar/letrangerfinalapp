var mongoose =require('mongoose');
var schema = mongoose.Schema;

var categorySchema = new schema({
	name: "string",
	id: {type:"string", index:1, required:true, unique:true},
}, {collection: 'categories'});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;