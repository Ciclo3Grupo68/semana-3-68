const models = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../secret/config.js');

exports.signin = async(req, res) => {
    models.user.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(!user){
            return res.status(404).send('User Not Found.');
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            return res.status(401).send({auth: false, accessToken: null, reason: "Invalid Password"});
        }
        var token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,                    
        }, config.secret,
        {
            expiresIn: 86400 // 24 horas
        });

        res.status(200).send({auth: true, accessToken: token});
    }
    
    ).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
}