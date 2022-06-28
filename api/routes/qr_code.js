const fs = require('fs')
const express = require('express')
const qr = require('qr-image')
const router = express.Router()

const createPath = (path) => {
  !fs.existsSync(path) && fs.mkdirSync(path)
}

const QR_PATH = 'api/uploads/qr_code/'
createPath(QR_PATH)

router.post('/', (req, res) => {
  if (req.query.url && req.query.id && req.query.title) {
    const url = req.query.url
    const title = req.query.title
    const id = req.query.id
    const qrSvg = qr.image(url, { size: 8 })
    qrSvg.pipe(fs.createWriteStream(QR_PATH + 'qr_code_' + title + '_' + id + '.png'))
  }
  res.json({ message: 'ok' })
})

module.exports = router
