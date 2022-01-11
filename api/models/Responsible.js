const mongoose = require('mongoose')

const ResponsibleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  cpf: {
    type: String
  },
  birth_date: {
    type: Date
  },
  gender: {
    type: String
  },
  is_owner: {
    type: Boolean
  }
})

module.exports = ResponsibleSchema
