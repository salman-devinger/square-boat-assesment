const mdlMovieDtl = require('../models/mdlMovieDtl');
const klass = require('klass');
const _ = require('underscore');

module.exports = klass({

    initialize: function () {

        this.movieDtlModal = new mdlMovieDtl();

    },


    /* GET Movie Detail Page */
    get: function (req, res, next) {
        const MOVIE_ID = req.query.MOVIE_ID || 1,
            MOVIE_NAME = req.query.MOVIE_NAME || '',
            USER_ID = req.query.USER_ID || '',
            self = this;
        
        self.movieDtlModal.getMovieDtl(req, MOVIE_ID, (err, result) => {
            if (err) throw err;
            const theaterList = _.uniq(result, 'THEATER_ID');
            const slotList = _.uniq(result, 'SLOT_ID');

            res.render('vwMovieBooking', {
                title: 'SquareBoat',
                isAdmin: req.session ? req.session.isAdmin : false,
                userId: (req.session && req.session.user) ? req.session.user.USER_ID : 1,
                userName: (req.session && req.session.user) ? req.session.user.USER_NAME : '',
                movieId: MOVIE_ID,
                movieName: MOVIE_NAME,
                movieData: result,
                theaterList: theaterList,
                slotList: slotList
            });
        });

    },

    /* Post Movie booking */
    post: function (req, res, next) {
        const data = req.body,
            self = this;

        self.movieDtlModal.bookMovie(req, data, (err, result) => {
            res.send({
                result: result
            });
        });

    }

});
