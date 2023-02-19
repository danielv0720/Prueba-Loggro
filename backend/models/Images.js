
const mongoose =require('mongoose')

const schema = new mongoose.Schema({

  name: {type: String , required: true} ,
  photo: {type: String , required: true} ,


})

const Images = mongoose.model('images',schema)
module.exports = Images