'use strict';

global.config = require('./config/production.json');

var getHosts = require('./lib/git-hosts');
var updateHosts = require('./lib/update-hosts');

updateHosts(global.config.hostsFile, global.config.ip, getHosts(global.config.sources, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.log('Updated Hosts');
	}
}));