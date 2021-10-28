const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
  postal_code: {
    type: String
  },
  city: {
    type: String
  },
  uf: {
    type: String
  },
  street: {
    type: String
  },
  number: String,
  neighborhood: String,
  complement: String,
  description: String,
  address: String,
  source: Object,
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number]
    }
  }
})

AddressSchema.index({ location: '2dsphere' })

module.exports = AddressSchema
