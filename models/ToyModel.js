var mongoose = require('mongoose');
var ToySchema = mongoose.Schema({
   model:   String,
   color: String,
   image: String,
   manufacturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'manufacturers'  // 'manufacturers': collection
   }
});
//Relationship : toys (many) - manufacturers (one)

var ToyModel = mongoose.model('toys', ToySchema); // 'toys' : collection
module.exports = ToyModel;