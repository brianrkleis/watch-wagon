const knex = require('../db/db_repository');
const resource = require('./rentResource');
const moment = require('moment');

class Rent {

    /**
     * 
     * @param {
     *    payment_method: string,
     *    streaming_rent_id: number,
     *    user_id: number
     * } rent 
     * @returns 
     */
    static async create_rent(rent) {
        const streaming_rent = await knex('streaming_rents').where('id', rent.streaming_rent_id).first();
        if (streaming_rent.rent_days == 0) {
            rent.rent_expire = null;
        } else {
            rent.rent_expire = moment(new Date()).add(streaming_rent.rent_days, 'days').format('YYYY-MM-DD HH:mm');
        }
        rent.price = streaming_rent.price;
        rent.rent_dt = moment(new Date()).format('YYYY-MM-DD HH:mm');
        const toReturn = await knex('rents').insert(rent);

        return resource(toReturn);
    }
}

module.exports = { Rent };