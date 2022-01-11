const mongoose = require('mongoose')

const ProductionActivitySchema = new mongoose.Schema({
  activity: {
    type: Object,
    required: true
  },
  quantity: {
    type: Number
  },
  area: {
    type: Number
  }
})

module.exports = ProductionActivitySchema
