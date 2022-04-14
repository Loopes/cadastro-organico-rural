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
  previous_year_total_quantity_production: {
    type: Number
  },
  previous_year_area_production: {
    type: Number
  }
})

module.exports = ProductionActivitySchema
