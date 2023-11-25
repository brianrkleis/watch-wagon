const hash = require('password-hash');

async function compare_password(hashed, password) {
    return await hash.verify(password, hashed);
}

async function hash_password(password) {
    return await hash.generate(password);
}

module.exports = {
    compare_password, hash_password
}