const mdlMovieDtl = require('../models/mdlMovieDtl');
const klass = require('klass');
const _ = require('underscore');

module.exports = klass({

    initialize: function () {

        this.movieDtlModal = new mdlMovieDtl();

    },


    /* GET Movie Detail Page */
    get: function (req, res, next) {
        const self = this;

        res.render('vwAddTheaterMovie', {
            title: 'SquareBoat',
            isAdmin: req.session ? req.session.isAdmin : false,
            userId: (req.session && req.session.user) ? req.session.user.USER_ID : 1,
            userName: (req.session && req.session.user) ? req.session.user.USER_NAME : ''
        });

    },

    /* Post Movie booking */
    post: function (req, res, next) {
        const data = req.body,
            self = this;

        self.movieDtlModal.adMovieTheater(req, data, (err, result) => {
            res.send({
                result: result
            });
        });

    }

});
