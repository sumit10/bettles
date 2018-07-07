const express = require('express');
const validate = require('express-validation');
const userCtrl = require('./user.controller');
const router = express.Router();


router.route('/login')
  .post(validate(userCtrl.loginValidator),userCtrl.login)


  module.exports = router;