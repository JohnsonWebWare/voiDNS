'use strict';

var chai   = require('chai');
var expect = chai.expect;

var getHosts = require('./../../lib/get-hosts');
var updateHosts = require('./../../lib/update-hosts');

var sources    = ['http://someonewhocares.org/hosts/hosts'];
var badSources = ['http://localhost:1'];

var testHosts;

describe('get-hosts', () => {
	it('Should return a list of hosts', function (done) {
		this.timeout(0)

		getHosts(sources, (err, results) => {
			expect(err, 'err').to.not.exist;
			expect(results, 'getHosts').to.be.a('Array');

			testHosts = results;
			done();
		});
	});

	it('Should catch errors', function (done) {
		this.timeout(0);

		getHosts(badSources, (err, results) => {
			expect(err, 'err').to.exist;
			expect(results, 'getHosts').to.be.a('Array');

			done();
		});
	});
});

describe('update-hosts', function () {
	it('Should write a file', function (done) {
		updateHosts('./tmp/void.list', '192.168.0.250', testHosts, (err) => {
			expect(err).to.not.exist;

			done();
		});
	});
});