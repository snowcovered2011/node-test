'use strict';

module.exports = {
	port: 9995,
	url: 'mongodb://localhost:27017/node-test',
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
		    secure:   false,
		    maxAge:   365 * 24 * 60 * 60 * 1000,
		}
	}
}