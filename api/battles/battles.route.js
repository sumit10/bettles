const express = require('express');
const battleCtrl = require('./battles.controller');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth.authenticate)

router.route('/list')
  .get(battleCtrl.list)

router.route('/count')
  .get(battleCtrl.count) 

router.route('/stats')
  .get(battleCtrl.stats) 

router.route('/search')
  .get(battleCtrl.search) 


module.exports = router;