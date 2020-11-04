const mdlMovieDtl = require('../models/mdlMovieDtl');
const klass = require('klass');

module.exports = klass({

    initialize: function () {

        this.movieDtlModal = new mdlMovieDtl();

    },


    /* GET Movie List Page */
    get: function (req, res, next) {

        this.movieDtlModal.getMovieList(req, (errChild, resultChild) => {
            if (errChild) throw errChild;
            res.render('vwMovieList', {
                title: 'SquareBoat', 
                movieList: resultChild,
                isAdmin: req.session ? req.session.isAdmin : false,
                userId: (req.session && req.session.user) ? req.session.user.USER_ID : 1,
                userName: (req.session && req.session.user) ? req.session.user.USER_NAME : ''
            });
        });

    }

});
