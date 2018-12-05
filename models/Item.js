const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
			name:{
				type: String,
				require: true
			},
			comment:{
				type: String,
				require: true
			},
			imageURL:{
				type: String,
				require: true
			},
			status:{
				type: String,
				require: true
			},
			dateAdded: {
				type: Date,
				require: true
			}
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
