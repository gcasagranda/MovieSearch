const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const movieSearchController = require('../controllers/movieSearchController');
const watchlistController = require('../controllers/watchlistController');
const streamingSearchController = require('../controllers/streamingSearchController');

route.post('/login', userController.postLogin);
route.post('/logout', userController.postLogout);
route.post('/signup', userController.postSignup);
route.get('/moviesearch/:keyword', movieSearchController.searchMovies);
route.post('/addwatchlist', watchlistController.addWatchlist);
route.get('/streamingSearch/:imdbId', streamingSearchController.streamingSearch);
route.get('/watchlist/:userId', watchlistController.getWatchlist);

module.exports = route;