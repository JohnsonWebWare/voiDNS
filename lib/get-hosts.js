'use strict';

var request = require('request');
var async   = require('async');

var comment = /#.*/g;
var defaultIP = /(127\.0\.0\.1\s*|0\.0\.0\.0\s*)/g;
var cleanLines = /^(\r\n|\n|\r)/gm;
var emptyLine = /^\s*$/g;
var endLine = /\r\n|\n|\r/;

function get_hosts (sources, cb) {
	async.map(sources, req_hosts, (err, results) => {
		if (err) {
			return cb(err, merge_and_remove_duplicates(results));
		}
		return cb(null, merge_and_remove_duplicates(results));
	});
}

function req_hosts (item, callback) {
	request.get(item, function (err, response, body) {
		if (err) {
			return callback(err, null);
		}
		return callback(null, process_hosts(body));
	});
}

function merge_results (a) {
	return [].concat.apply([], a);
}

function remove_duplicates (a) {
	return a.filter((b, c) => {
		return a.indexOf(b) == c;
	});
}

function merge_and_remove_duplicates (a) {
	return remove_duplicates(merge_results(a));
}

function process_hosts (a) {
	return split_hosts(clean_hosts(a));
}

function split_hosts (a) {
	return a.split(endLine);
}

function clean_hosts (a) {
	a = a.replace(defaultIP, '');
	a = a.replace(comment, '');
	//a = a.replace('localhost', '');
	//a = a.replace('::', '');
	//a = a.replace(cleanLines, '');
	a = a.trim();
	a = a.replace(emptyLine, '');
	return a;
}

module.exports = get_hosts;