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
  },
  previous_year_total_production: {
    type: Number
  },
  current_year_estimated_production: {
    type: Number
  }
})

module.exports = ProductionActivitySchema
