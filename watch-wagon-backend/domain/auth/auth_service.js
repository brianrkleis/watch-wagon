const password_func = require('./password');
var jwt = require('jsonwebtoken');
var { User } = require('../user/user');

class AuthService {
    static async login(req, res) {
        let email = req.body.email;
        let password = req.body.password;

        let user = await User.find_by_email_w_password(email);
        if (!user.id) {
            return res.status(403).send({"error": "incorrect credentials"});
        }

        const result = await password_func.compare_password(user.password, password);

        if (!result) {
            return res.status(403).send({'error': 'Unauthorized'});
        }
        return res.status(201).send({'token': this.make_token(user.id)});
    }

    static make_token(user_id) {
        return jwt.sign({ user_id: user_id, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, process.env.JWT_SECRET);
    }

    static verify_token(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}

module.exports = { AuthService };