const mdlSignUp = require('../models/mdlSignUp');
const klass = require('klass');

module.exports = klass({

    initialize: function () {

        this.signUpModel = new mdlSignUp();

    },


    /* GET Sign-Up Page */
    get: function (req, res, next) {

        res.render('vwSignUp', {
            title: 'SquareBoat', res: []
        });
    },

    /* POST Sign-Up Page */
    post: function (req, res, next) {
        
        const data = req.body,
            self = this;

        self.signUpModel.saveSignUpData(req, data, (err, result) => {
            if(err) res.send({
                result: err,
            });
            res.send({
                result: result,
            });
        });
    }
});