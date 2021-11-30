const mongoose = require('mongoose')
const AddressSchema = require('./Address')
const ObjectId = mongoose.Schema.Types.ObjectId

const CertifyingEntitySchema = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  uf: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  cnpj: Number,
  phone: Number,
  name: String,
  email: String,
  contacts: String,
  address: AddressSchema,
  pictures: [Object],
  responsable: String,
  documents: [Object]
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

const CertifyingEntity = mongoose.models.CertifyingEntity || mongoose.model('CertifyingEntity', CertifyingEntitySchema)
module.exports = CertifyingEntity
