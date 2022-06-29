const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const FieldNotebookEntitySchema = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: Array,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  productionUnit: {
    type: {
      id: String,
      name: String
    },
    required: true
  },
  productionActivitie: {
    type: {
      id: String,
      name: String
    },
    required: true
  },
  rawMaterial: {
    type: Array
  },
  activities: {
    type: Array
  },
  codTraceability: String,
  observation: String
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

const FieldNotebookEntity = mongoose.models.FieldNotebookEntity || mongoose.model('FieldNotebookEntity', FieldNotebookEntitySchema)
module.exports = FieldNotebookEntity
