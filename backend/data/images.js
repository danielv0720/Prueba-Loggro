let images = [
  {
      name: "Rosario",
      photo: "https://www.rosario3.com/__export/1659697789800/sites/rosario3/img/2022/08/05/img_20220805_074435_546_1.jpg_1756841869.jpg",

  }
]

require('dotenv').config()
require('../../backend/data/database')

const Images = require('../models/images')

images.forEach(elemento =>{
  Images.create({

    name: elemento.name ,
    photo: elemento.photo,
})
})