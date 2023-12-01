function toResource(user) {
    if (!user.id) {
        return {};
    }
    return {
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "rents": user.rents,
        "movies": user.movies
    };
}

function toResourceWithPassword(user) {
    if (!user.id) {
        return {};
    }
    return {
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "password": user.password
    };
}

function userToResource(user, withPassword = false) {
    if (!user) return {};
    if (!user.id && Array.isArray(user)){
        return user.map(toResource);
    }
    return !withPassword ? toResource(user) : toResourceWithPassword(user);
}

module.exports = userToResource;