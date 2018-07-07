const express = require('express');
const battlesRoutes = require('./battles/battles.route');
const userRoutes = require('./user/user.route');
const router = express.Router(); 

router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/user', userRoutes);
router.use('/battles', battlesRoutes);

module.exports = router;