'use strict';

var express = require('express');
var router = express.Router();
var _ = require('underscore');

const isLogedIn = require('../../middleware/isLogdIn');
const isAdmin = require('../../middleware/isAdmin');
const logout = require('../../middleware/logout');
var cntlMovieList = require('../controllers/cntlMovieList');
var cntlMovieBooking = require('../controllers/cntlMovieBooking');
var cntlMapMovieEntry = require('../controllers/cntlMapMovieEntry');
var cntlUserMovie = require('../controllers/cntlUserMovie');
var cntlAddTheterMovie = require('../controllers/cntlAddTheterMovie');
var cntlLogin = require('../controllers/cntlLogin');
var cntlSignUp = require('../controllers/cntlSignUp');

var movieListObj = new cntlMovieList();
var movieBookingObj = new cntlMovieBooking();
var mapMovieEntryObj = new cntlMapMovieEntry();
var userMovieOnj = new cntlUserMovie();
var addTheterMovieObj = new cntlAddTheterMovie();
var loginObj = new cntlLogin();
var signUpObj = new cntlSignUp();


/*GET movie-list Page*/
router.get('/', (req, res) => {
    res.redirect('/movie-list');
});

/*Logout route*/
router.get('/log-out', logout, (req, res) => {
    res.redirect('/login');
});
router.get('/login/', logout, _.bind(loginObj.get, loginObj));
router.post('/login/', _.bind(loginObj.post, loginObj));
router.get('/sign-up/', logout, _.bind(signUpObj.get, signUpObj));
router.post('/sign-up/', logout, _.bind(signUpObj.post, signUpObj));
router.get('/movie-list/', _.bind(movieListObj.get, movieListObj));
router.get('/movie-booking/', isLogedIn, _.bind(movieBookingObj.get, movieBookingObj));
router.post('/movie-booking/', isLogedIn, _.bind(movieBookingObj.post, movieBookingObj));
router.get('/map-movie-entry/', isLogedIn, isAdmin, _.bind(mapMovieEntryObj.get, mapMovieEntryObj));
router.post('/map-movie-entry/', isLogedIn, isAdmin, _.bind(mapMovieEntryObj.post, mapMovieEntryObj));
router.get('/movie-entry-list/', isLogedIn, isAdmin, _.bind(mapMovieEntryObj.getMapedMovieList, mapMovieEntryObj));
router.get('/edit-movie-entry/', isLogedIn, isAdmin, _.bind(mapMovieEntryObj.getMapedMovieDtl, mapMovieEntryObj));
router.post('/edit-movie-entry/', isLogedIn, isAdmin, _.bind(mapMovieEntryObj.updateMapedMovie, mapMovieEntryObj));
router.get('/add-theater-movie/', isLogedIn, isAdmin, _.bind(addTheterMovieObj.get, addTheterMovieObj));
router.post('/add-theater-movie/', isLogedIn, isAdmin, _.bind(addTheterMovieObj.post, addTheterMovieObj));
router.get('/user-movie/', isLogedIn, _.bind(userMovieOnj.get, userMovieOnj));

module.exports = router;