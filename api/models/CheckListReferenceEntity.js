const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const CheckListReferenceEntitySchema = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  obs: String,
  documents: [Object]
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

const CheckListReferenceEntity = mongoose.models.CheckListReferenceEntity || mongoose.model('CheckListReferenceEntity', CheckListReferenceEntitySchema)
module.exports = CheckListReferenceEntity
