'use strict';

var fs = require('fs');

var getHosts = require('./get-hosts');

var re = RegExp("(localhost|broadcasthost|^local$|^\s$)");

function update_hosts (file, ip, hosts, cb) {
	var a = '';
	for(var i in hosts) {
		if(!re.test(hosts[i]) && !/^\s*$/.test(hosts[i])) {
			a += ip + '\t' + hosts[i].trim() + '\n';
		}
	}
	fs.writeFile(file, a, cb);
}

module.exports = update_hosts;