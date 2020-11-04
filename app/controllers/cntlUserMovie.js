const mdlMovieDtl = require('../models/mdlMovieDtl');
const klass = require('klass');
const _ = require('underscore');

module.exports = klass({

    initialize: function () {

        this.movieDtlModal = new mdlMovieDtl();

    },


    /* GET Movie booking Page */
    get: function (req, res, next) {
        const USER_ID = req.query.USER_ID || 1,
            self = this;
        
        self.movieDtlModal.getUserMovie(req, USER_ID, (err, result) => {
            if (err) throw err;
            
            res.render('vwUserMovie', {
                title: 'SquareBoat',
                isAdmin: req.session ? req.session.isAdmin : false,
                userId: (req.session && req.session.user) ? req.session.user.USER_ID : 1,
                userName: (req.session && req.session.user) ? req.session.user.USER_NAME : '',
                movieList: result
            });
        });

    }

});
