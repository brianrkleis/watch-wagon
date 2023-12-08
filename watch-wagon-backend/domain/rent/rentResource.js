function toResource(rent) {
    return {
        "id": rent.id,
        "user_id": rent.user_id,
        "rent_dt": rent.rent_dt,
        "rent_expire": rent.rent_expire,
        "payment_method": rent.payment_method,
        "streaming_rent_id": rent.streaming_rent_id
    };
}

function rentToResource(rent) {
    return toResource(rent);
}

module.exports = rentToResource;
