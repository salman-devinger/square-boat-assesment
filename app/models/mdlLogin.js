const klass = require('klass');
let mySqlConnection = require('../../config/db');

module.exports = klass({
    
    initialize: function () {

    },

    /* Query to get user data */
    getUserData: function (req, email, cb) {
        const query = 'SELECT * FROM BMS_USER WHERE EMAIL = ?';
        
        mySqlConnection.query(query, [email], function(err, result) {
            if (err) {
                console.error(err)
                return cb(err, null);
            }
            return cb(null, result);
        });
    }

    
});