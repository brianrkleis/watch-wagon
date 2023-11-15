var express = require('express');
var router = express.Router();
var { AuthService } = require('../domain/auth/auth_service')

router.post('/login', async (req, res) => {
   return await AuthService.login(req, res);
})

module.exports = router;