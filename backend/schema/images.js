const joi = require('joi')

const schema = joi.object({

  name: joi.string().required()
  .min(3)
  .max(50) ,
  photo: joi.string().required()
  ,
})

module.exports = schema