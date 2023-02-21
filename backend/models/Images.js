
const mongoose =require('mongoose')

const schema = new mongoose.Schema({
  imageName: {type: String , required: true} ,
  url: {type: String, required: true} ,
  date: { type: Date, required: true },
  time: {type: Number, required: true},
  user: {type: String, required: true},
})

const Images = mongoose.model('images', schema)
module.exports = Images