const klass = require('klass');
let mySqlConnection = require('../../config/db');

module.exports = klass({
    
    initialize: function () {

    },

    /* Query to get movie list */
    getMovieList: function (req, cb) {
        const query = 'SELECT * FROM BMS_MOVIE WHERE ACTIVE_YN = ?';
        
        mySqlConnection.query(query, ['Y'], function(err, result) {
            if (err) {
                console.error(err)
                return cb(err, null);
            }
            return cb(null, result);
        });
    },

    /* Query to get movie detail */
    getMovieDtl: function (req, movieId, cb) {
        const query = 'CALL BMS_GET_MOVIE_DTL(?)';
        
        mySqlConnection.query(query, [movieId], function(err, result) {
            if (err) {
                console.error(err)
                return cb(err, null);
            }
            return cb(null, result[0]);
        });
    },

    /* Query to get detail for adding new movie detail */
    getMovieEntryDtl: function (req, cb) {
        const query = 'CALL BMS_GET_NEW_MOVIE_ENTRY_DTL()';
        
        mySqlConnection.query(query, [], function(err, result) {
            if (err) {
                console.error(err)
                return cb(err, null);
            }
            return cb(null, result);
        });
    },

    /* Query to save maped movie detail */
    saveMapedMovieEntry: function (req, ipData, cb) {
        const query = 'INSERT INTO BMS_MOVIE_AVAILABLE (THEATER_ID, MOVIE_ID, SLOT_ID) VALUES(?, ?, ?)';
        
        mySqlConnection.query(query, [ipData.THEATER_ID, ipData.MOVIE_ID, ipData.SLOT_ID], function(err, result) {
            if (err) {
                console.error(err)
                return cb(err, null);
            }
            return cb(null, result);
        });
    },

    /* Query to book movie detail */
    bookMovie: function (req, ipData, cb) {
        const query = 'CALL BMS_BOOK_MOVIE(?, ?, ?)';
        
        mySqlConnection.query(query, [ipData.AVAIL_ID, ipData.USER_ID, ipData.TICKET_COUNT], function(err, result) {
            if (err) {
                console.error(err)
                return cb(err, null);
            }
            return cb(null, result[0]);
        });
    },

    /* Query to get user movie detail */
    getUserMovie: function (req, userId, cb) {
        const query = 'CALL BMS_GET_USER_MOVIE(?)';
        
        mySqlConnection.query(query, [userId], function(err, result) {
            if (err) {
                console.error(err)
                return cb(err, null);
            }
            return cb(null, result[0]);
        });
    },

    /* Query to get mapped movie list */
    getMapedMovieList: function (req, cb) {
        const query = 'CALL BMS_GET_MAPED_MOVIE_LIST()';
        
        mySqlConnection.query(query, [], function(err, result) {
            if (err) {
                console.error(err)
                return cb(err, null);
            }
            return cb(null, result[0]);
        });
    },

    /* Query to get mapped movie detail */
    getMapedMovieDtl: function (req, availId, cb) {
        const query = 'CALL BMS_GET_MAPED_MOVIE_DTL(?)';
        this.getMovieEntryDtl(req, (err, result) => {
            if (err) return cb(err, null);
            mySqlConnection.query(query, [availId], function(errCh, resultCh) {
                if (errCh) {
                    console.error(errCh)
                    return cb(errCh, null);
                }
                return cb(null, { movieListDt: result, mapedMovieDt: resultCh[0] });
            });
        });
        
    },

    /* Query to update mapped movie */
    updateMapedMovie: function (req, ipData, cb) {
        const query = 'UPDATE BMS_MOVIE_AVAILABLE SET THEATER_ID = ?, MOVIE_ID = ?, SLOT_ID = ? WHERE AVAIL_ID = ?';
        mySqlConnection.query(query, [ipData.THEATER_ID, ipData.MOVIE_ID, ipData.SLOT_ID, ipData.AVAIL_ID ], function(err, result) {
            if (err) {
                console.error(err)
                return cb(err, null);
            }
            return cb(null, result);
        });
        
    },

    /* Query to add new movie/theater */
    adMovieTheater: function (req, ipData, cb) {
        const query = 'CALL BMS_ADD_THEATER_MOVIE(?, ?, ?)';
        
        mySqlConnection.query(query, [ipData.TYPE_ID, ipData.NAME, ipData.DESC], function(err, result) {
            if (err) {
                console.error(err)
                return cb(err, null);
            }
            return cb(null, result[0]);
        });
    },
});