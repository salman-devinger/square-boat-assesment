'use strict';

var app = require('./app');
var port = process.env.NODE_PORT || 5000;
app.listen(port, (err) => {
	if (err) console.error('Error while starting the app:', err);
	else {
		console.log('Web App listening at port ' + port + '.')
	};
});