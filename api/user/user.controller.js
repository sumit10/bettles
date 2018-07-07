var jwt = require('jsonwebtoken');
var Joi = require('Joi');

exports.loginValidator = {
    body: {
        username: Joi.string().required(),
        password: Joi.string().required()
      }
}

exports.login = async (req, res) =>{
    let config = req.app.get('config');
    if(req.body.username === "test" && req.body.password === "test"){
        let token = jwt.sign({ user: 'test',  exp: Math.floor(Date.now() / 1000) + 60  }, config.jwtSecret);
        res.json({
            token:token
        })
    }else{
        res.status(401).json({
            message:"Wrong user name password"
        })
    }
}