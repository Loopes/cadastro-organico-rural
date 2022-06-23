const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const RawMaterialsEntitySchema = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  uM: {
    type: String,
    required: true
  },
  reference: String,
  guidelines: String,
  restrictions: String,
  allowed: Boolean,
  validityDateInit: Date,
  validityDateFinal: Date,
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

const RawMaterialsEntity = mongoose.models.RawMaterialsEntity || mongoose.model('RawMaterialsEntity', RawMaterialsEntitySchema)
module.exports = RawMaterialsEntity
