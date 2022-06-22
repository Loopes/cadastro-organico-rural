const mongoose = require('mongoose')
const AddressSchema = require('./Address')
const ResponsibleSchema = require('./Responsible')
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
  name: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true
  },
  phone: String,
  email: String,
  contacts: String,
  address: AddressSchema,
  responsibles: [ResponsibleSchema],
  documents: [Object],
  pictures: [Object]
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

const CertifyingEntity = mongoose.models.CertifyingEntity || mongoose.model('CertifyingEntity', CertifyingEntitySchema)
module.exports = CertifyingEntity
