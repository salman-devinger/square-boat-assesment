const mdlMovieDtl = require('../models/mdlMovieDtl');
const klass = require('klass');

module.exports = klass({

    initialize: function () {

        this.movieDtlModal = new mdlMovieDtl();

    },


    /* GET Movie Detail Page */
    get: function (req, res, next) {
        const self = this;

        self.movieDtlModal.getMovieEntryDtl(req, (err, result) => {
            if (err) throw err;

            res.render('vwMapMovieEntry', {
                title: 'SquareBoat',
                isAdmin: req.session ? req.session.isAdmin : false,
                userName: (req.session && req.session.user) ? req.session.user.USER_NAME : '',
                theaterList: result[0],
                movieList: result[1],
                timeSlot: result[2]
            });
        });

    },

    /* GET Mapped Movie Detail Page */
    getMapedMovieList: function (req, res, next) {
        const self = this;

        self.movieDtlModal.getMapedMovieList(req, (err, result) => {
            if (err) throw err;

            res.render('vwMapedMovieList', {
                title: 'SquareBoat',
                isAdmin: req.session ? req.session.isAdmin : false,
                userName: (req.session && req.session.user) ? req.session.user.USER_NAME : '',
                movieList: result
            });
        });

    },

    /* GET Movie Detail Page */
    getMapedMovieDtl: function (req, res, next) {
        const self = this,
            AVAIL_ID = req.query.AVAIL_ID;

        self.movieDtlModal.getMapedMovieDtl(req, AVAIL_ID, (err, result) => {
            if (err) throw err;
            
            res.render('vwMapMovieEntry', {
                title: 'SquareBoat',
                isAdmin: req.session ? req.session.isAdmin : false,
                userName: (req.session && req.session.user) ? req.session.user.USER_NAME : '',
                availId: AVAIL_ID,
                theaterList: result.movieListDt[0],
                movieList: result.movieListDt[1],
                timeSlot: result.movieListDt[2],
                mapedMovie: result.mapedMovieDt[0]
            });
        });

    },

    /* POST Map Movie Entry */
    post: function (req, res, next) {
        const self = this,
            data = req.body;

        self.movieDtlModal.saveMapedMovieEntry(req, data, (err, result) => {
            if (err) throw err;
            res.send({
                result: data
            });
        });

    },

    /* POST Update Maped Movie Entry */
    updateMapedMovie: function (req, res, next) {
        const self = this,
            data = req.body;

        self.movieDtlModal.updateMapedMovie(req, data, (err, result) => {
            if (err) throw err;
            res.send({
                result: data
            });
        });

    }

});
