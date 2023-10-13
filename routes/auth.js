var express = require('express');
var router = express.Router();
var { AuthService } = require('domain/auth/auth_service')

router.post('/login', (req, res) => {
   return AuthService.login(req, res);
})

module.exports = router;