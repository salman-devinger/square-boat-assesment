const klass = require('klass');
let mySqlConnection = require('../../config/db');

module.exports = klass({
    
    initialize: function () {

    },

    /* Query to get user data */
    saveSignUpData: function (req, params, cb) {
        const query = 'CALL BMS_SIGN_UP_USER(?, ?, ?)';
        
        mySqlConnection.query(query, [params.EMAIL, params.PASS, params.NAME], function(err, result) {
            if (err) {
                console.error(err)
                return cb(err, null);
            }
            return cb(null, result[0]);
        });
    }

    
});