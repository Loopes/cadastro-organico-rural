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

  CheckListEntity.find(query).sort({ name: 1 }).exec((err, checkList) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(checkList)
    }
  })
})

router.get('/:id', (req, res) => {
  CheckListEntity.findOne({
    _id: req.params.id
  }).exec((err, checkList) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(checkList)
    }
  })
})

router.post('/', auth.authenticated, (req, res) => {
  const newCheckList = new CheckListEntity(req.body)
  console.log(req.user)
  newCheckList.codTraceability += newCheckList._id
  newCheckList.user = req.user._id
  newCheckList.save((err, checkList) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(checkList)
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
  }, (err, checkList) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(checkList)
    }
  })
})

router.delete('/:id', auth.authenticated, (req, res) => {
  CheckListEntity.findOne({
    _id: req.params.id
  }).exec((err, checkList) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      checkList.remove()
      res.send(checkList)
    }
  })
})

module.exports = router
