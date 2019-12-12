const router = require('express').Router();

router.use('/auth', require('./auth.routes'))
router.use('/plants', require('./plants.routes'))
router.use('/tasks', require('./tasks.routes'))
router.use('/users', require('./users.routes'))
router.use('/utils', require('./utils.routes'))

module.exports = router;