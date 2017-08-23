const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  _set : String,
  colorId: String,
  convertedCost: Number,
  timeShifted : Boolean,
  multiverseid:{type: Number, unique: true}
})

const Card = mongoose.model('Card', cardSchema)

module.exports = Card;
