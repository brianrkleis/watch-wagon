const password_func = require('./password');
var jwt = require('jsonwebtoken');

class AuthService {
    static login(req, res) {
        let email = req.body.email;
        let password = req.body.password;

        user = require('../user/user').find_by_email(email);

        password_func.compare_password(user.password, password).then((result) => {
            if (!result) {
                return res.status(403).send({'error': 'Unauthorized'});
            }
        });
        return res.status(201).send({'token': this.make_token(user.id)});
    }

    static make_token(user_id) {
        return jwt.sign({ user_id: user_id, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, process.env.JWT_SECRET);
    }

    static verify_token(token) {
        // TODO
        return true;
        const token = jwt.verify(token, process.env.JWT_SECRET);
    }
}

module.exports = { AuthService };