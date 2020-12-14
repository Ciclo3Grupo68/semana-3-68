const router = require('express').Router();
const models = require('../../models');
const userController = require('../../controllers/UserController.js');
const bcrypt = require('bcryptjs');

router.get('/', async(req,res) => {
    const user = await models.user.findAll();
    res.status(200).json(user);
});

router.post('/register', async(req,res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await models.user.create(req.body);
    res.status(200).json(user);
});

router.post('/signin', userController.signin);

module.exports = router;