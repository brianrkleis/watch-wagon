var express = require('express');
var router = express.Router();

const { Movies } = require('../domain/movies/movies');

router.get('/search', async function (req, res) {
  const movies = await Movies.search(req.query.q);
  res.json(movies);
});

router.get('/:moviesId', async function (req, res) {
  const movies = await Movies.find_by_id(req.params.moviesId);
  
  if (!movies.id) {
    res.status(404).json({"error": "Movie not found"});
    return;
  }
  res.json(movies);
});

router.get('/', async function (req, res) {
  const movies = await Movies.get_all();
  res.json(movies);
});

router.get('/:movieId/stats', async function (req, res) {
  const movies = await Movies.get_movie_stats(req.params.movieId, req.query.userId);
  res.json(movies);
});

module.exports = router;