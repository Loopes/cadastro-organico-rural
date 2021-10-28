const mongoose = require('mongoose')
const PointSchema = require('./Point')
const AddressSchema = require('./Address')

const ProductionUnitSchema = mongoose.Schema({
  uf: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  name: String,
  farm_address: [String],
  farm_gate_location: PointSchema,
  farm_house_location: PointSchema,
  correspondence_address: AddressSchema,
  access_route: String,
  contacts: String,
  pictures: [Object],
  documents: [Object],

  total_area: Number,
  organic_production_area: Number,
  permanent_preservation_area: Number,
  legal_reservea_area: Number,
  organic_since: Date,
  cultures: [String],
  previous_year_total_production: Number,
  current_year_estimated_production: Number,

  certifying_entity_type: String,
  certifying_entity: String

}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

const ProductionUnit = mongoose.models.ProductionUnit || mongoose.model('ProductionUnit', ProductionUnitSchema)
module.exports = ProductionUnit
