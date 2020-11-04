const mdlLogin = require('../models/mdlLogin');
const klass = require('klass');

module.exports = klass({

    initialize: function () {

        this.loginModal = new mdlLogin();

    },


    /* GET Login Page */
    get: function (req, res, next) {
        res.render('vwLogin', {
            title: 'SquareBoat', res: []
        });
    },

    /* POST Login Page */
    post: function (req, res, next) {
        
        const data = req.body,
            self = this,
            roleObj = {'ADMIN' : 1, 'USER': 2};

        
        self.loginModal.getUserData(req, data.EMAIL, (err, result) => {
            const isValidFlag = (result[0].PASSWORD == data.PASS) ? true : false;
            const resObj = {
                "SUCCESS": true,
                "IS_VALID": isValidFlag,
                "USER_ID": result[0].USER_ID
            };
            if(isValidFlag){
                req.session.user = result[0];
                req.session.isLoggedIn = true;
                req.session.isAdmin = (result[0].ROLE_ID == roleObj.ADMIN) ? true : false;
            }
            res.send(resObj);
        });
    }
});