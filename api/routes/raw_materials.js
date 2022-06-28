const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const RawMaterialsEntity = mongoose.model('RawMaterialsEntity')

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

  RawMaterialsEntity.find(query).sort({ name: 1 }).exec((err, rawMaterials) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(rawMaterials)
    }
  })
})

router.get('/mine', auth.authenticated, (req, res) => {
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
  if (req.user._id) {
    query.user = req.user._id
  }

  RawMaterialsEntity.find(query).sort({ name: 1 }).exec((err, rawMaterials) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(rawMaterials)
    }
  })
})

router.get('/:id', (req, res) => {
  RawMaterialsEntity.findOne({
    _id: req.params.id
  }).exec((err, rawMaterials) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(rawMaterials)
    }
  })
})

router.post('/', auth.authenticated, (req, res) => {
  const newRawMaterials = new RawMaterialsEntity(req.body)
  console.log(req.user)
  newRawMaterials.user = req.user._id
  newRawMaterials.save((err, rawMaterials) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(rawMaterials)
    }
  })
})

router.put('/:id', auth.authenticated, (req, res) => {
  const params = req.body
  RawMaterialsEntity.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, rawMaterials) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(rawMaterials)
    }
  })
})

router.delete('/:id', auth.authenticated, (req, res) => {
  RawMaterialsEntity.findOne({
    _id: req.params.id
  }).exec((err, rawMaterials) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      rawMaterials.remove()
      res.send(rawMaterials)
    }
  })
})

module.exports = router
