const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const CertifyingEntity = mongoose.model('CertifyingEntity')

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

  CertifyingEntity.find(query).sort({ name: 1 }).exec((err, certifyingEntity) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(certifyingEntity)
    }
  })
})

router.get('/:id', (req, res) => {
  CertifyingEntity.findOne({
    _id: req.params.id
  }).exec((err, certifyingEntity) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(certifyingEntity)
    }
  })
})

router.post('/', auth.authenticated, (req, res) => {
  const newCertifyingEntity = new CertifyingEntity(req.body)
  console.log(req.user)
  newCertifyingEntity.user = req.user._id
  newCertifyingEntity.save((err, certifyingEntity) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(certifyingEntity)
    }
  })
})

router.put('/:id', auth.authenticated, (req, res) => {
  const params = req.body
  CertifyingEntity.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, certifyingEntity) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(certifyingEntity)
    }
  })
})

router.delete('/:id', auth.authenticated, (req, res) => {
  CertifyingEntity.findOne({
    _id: req.params.id
  }).exec((err, certifyingEntity) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      certifyingEntity.remove()
      res.send(certifyingEntity)
    }
  })
})

module.exports = router
