var express = require('express');
var router = express.Router();
var { AuthService } = require('../domain/auth/auth_service')
var { User } = require('../domain/user/user');

router.post('/login', async (req, res) => {
   return await AuthService.login(req, res);
});

router.post('/register', async (req, res) => {
   res.json(await User.create_user(req.body));
});

module.exports = router;