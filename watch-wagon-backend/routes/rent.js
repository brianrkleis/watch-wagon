var express = require('express');
var router = express.Router();
const { Rent } = require('../domain/rent/rent');

router.post('/', async function(req, res) {
    const message = await Rent.create_rent(req.body);

    res.json(message);
});

module.exports = router;
  