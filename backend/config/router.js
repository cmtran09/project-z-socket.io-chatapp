const router = require('express').Router()
// const x = require('../controllers/control')

router.get('/', (req, res) => res.json({ message: 'HOMEPAGE' }))

router.get('/books', (req, res) => res.json({ message: 'BOOKs' }))

module.exports = router