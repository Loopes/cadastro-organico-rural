const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const FieldNotebookEntity = mongoose.model('FieldNotebookEntity')

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

  FieldNotebookEntity.find(query).sort({ name: 1 }).exec((err, fieldNotebook) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(fieldNotebook)
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

  FieldNotebookEntity.find(query).sort({ name: 1 }).exec((err, fieldNotebook) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(fieldNotebook)
    }
  })
})

router.get('/:id', (req, res) => {
  FieldNotebookEntity.findOne({
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
  const newFieldNotebook = new FieldNotebookEntity(req.body)
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
  FieldNotebookEntity.findOneAndUpdate({
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
  FieldNotebookEntity.findOne({
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
