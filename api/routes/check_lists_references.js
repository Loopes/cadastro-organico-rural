const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const CheckListReferenceEntity = mongoose.model('CheckListReferenceEntity')

router.get('/', (req, res) => {
  const query = {}

  if (req.query.search) {
    query.title = { $regex: req.query.search, $options: 'i' }
  }

  CheckListReferenceEntity.find(query).sort({ name: 1 }).exec((err, reference) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(reference)
    }
  })
})

router.get('/:id', (req, res) => {
  CheckListReferenceEntity.findOne({
    _id: req.params.id
  }).exec((err, reference) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(reference)
    }
  })
})

router.post('/', auth.authenticated, (req, res) => {
  const newReference = new CheckListReferenceEntity(req.body)
  console.log(req.user)
  newReference.codTraceability += newReference._id
  newReference.user = req.user._id
  newReference.save((err, reference) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(reference)
    }
  })
})

router.put('/:id', auth.authenticated, (req, res) => {
  const params = req.body
  CheckListReferenceEntity.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, reference) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(reference)
    }
  })
})

router.delete('/:id', auth.authenticated, (req, res) => {
  CheckListReferenceEntity.findOne({
    _id: req.params.id
  }).exec((err, reference) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      reference.remove()
      res.send(reference)
    }
  })
})

module.exports = router
