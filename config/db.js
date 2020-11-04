var mysql = require('mysql');
var mySqlConnection = mysql.createPool({
    host     : 'sql188.main-hosting.eu.',
    user     : 'u754512327_sws',
    password : 'salman123',
    database : 'u754512327_sws'
});

module.exports = mySqlConnection;