const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const ProductionUnit = mongoose.model('ProductionUnit')

router.get('/', (req, res) => {
  const query = {}

  if (req.query.search) {
    query.title = { $regex: req.query.search, $options: 'i' }
  }
  if (req.query.category) {
    query.category = req.query.category
  }
  if (req.query.tag) {
    query.tags = req.query.tag
  }

  ProductionUnit.find(query).sort({ name: 1 }).exec((err, productionUnits) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(productionUnits)
    }
  })
})

router.get('/:id', (req, res) => {
  ProductionUnit.findOne({
    _id: req.params.id
  }).exec((err, productionUnit) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(productionUnit)
    }
  })
})

router.post('/', auth.authenticated, (req, res) => {
  const newProductionUnit = new ProductionUnit(req.body)
  newProductionUnit.save((err, productionUnit) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(productionUnit)
    }
  })
})

router.put('/:id', auth.authenticated, (req, res) => {
  const params = req.body
  ProductionUnit.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, productionUnit) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(productionUnit)
    }
  })
})

router.delete('/:id', auth.authenticated, (req, res) => {
  ProductionUnit.findOne({
    _id: req.params.id
  }).exec((err, productionUnit) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      productionUnit.remove()
      res.send(productionUnit)
    }
  })
})

module.exports = router
