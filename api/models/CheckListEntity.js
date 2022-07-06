const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const CheckListEntitySchema = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  productionUnit: {
    type: Object
  },
  responsible: {
    type: Object
  },
  fieldNotebook: {
    type: Object
  },
  reference: {
    type: Object
  },
  date: {
    type: String
  },
  checkLists: {
    type: Array
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

const CheckListEntity = mongoose.models.CheckListEntity || mongoose.model('CheckListEntity', CheckListEntitySchema)
module.exports = CheckListEntity
