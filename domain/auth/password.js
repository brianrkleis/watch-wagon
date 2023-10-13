const argon2 = require('argon2');

async function compare_password(hashed, password) {
    return await argon2.verify(hashed, password);
}

async function hash_password(password) {
    console.log(process.env.APP_SECRET);
    return await argon2.hash(password, {secret: Buffer.from(process.env.APP_SECRET)})
}

module.exports = {
    compare_password, hash_password
}