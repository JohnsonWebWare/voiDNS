'use strict';

global.config = require('./config/production.json');

var getHosts = require('./lib/get-hosts');
var updateHosts = require('./lib/update-hosts');

getHosts(global.config.sources, (err, blockHosts) => {
	updateHosts(global.config.hostsFile, global.config.ip, blockHosts, (err) => {
		if (err) {
			console.error(err);
		} else {
			console.log('Updated Hosts');
		}
	});
});
