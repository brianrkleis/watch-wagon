var express = require('express');
var router = express.Router();

const { WatchList } = require('../domain/watchlist/watchlist');

router.post('/:userId/:movieId', async function(req, res) {
  res.json(await WatchList.add_to_watchlist(req.params.userId, req.params.movieId));
});

router.delete('/:userId/:movieId', async function(req, res) {
  res.json(await WatchList.remove_from_watchlist(req.params.userId, req.params.movieId));
});

router.get('/:userId', async function (req, res) {
    res.json(await WatchList.get_movies(req.params.userId));
});

module.exports = router;