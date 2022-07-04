const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const CheckListEntity = mongoose.model('CheckListEntity')

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

  CheckListEntity.find(query).sort({ name: 1 }).exec((err, fieldNotebook) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(fieldNotebook)
    }
  })
})

router.get('/:id', (req, res) => {
  CheckListEntity.findOne({
    _id: req.params.id
  }).exec((err, fieldNotebook) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(fieldNotebook)
    }
  })
})

router.post('/', auth.authenticated, (req, res) => {
  const newFieldNotebook = new CheckListEntity(req.body)
  console.log(req.user)
  newFieldNotebook.codTraceability += newFieldNotebook._id
  newFieldNotebook.user = req.user._id
  newFieldNotebook.save((err, fieldNotebook) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(fieldNotebook)
    }
  })
})

router.put('/:id', auth.authenticated, (req, res) => {
  const params = req.body
  CheckListEntity.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, fieldNotebook) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(fieldNotebook)
    }
  })
})

router.delete('/:id', auth.authenticated, (req, res) => {
  CheckListEntity.findOne({
    _id: req.params.id
  }).exec((err, fieldNotebook) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      fieldNotebook.remove()
      res.send(fieldNotebook)
    }
  })
})

module.exports = router
