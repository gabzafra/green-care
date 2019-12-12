const router = require('express').Router();

router.use('/auth', require('./auth.routes'))
router.use('/plants', require('./plants.routes'))

module.exports = router;