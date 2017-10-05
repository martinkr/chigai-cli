
/**
 * Specs for the cli command "reference
 *
 * This command sets the last screenshot to be the new reference item.
 * If there's new "last" item, it will create a new one.
 *
 * @copyright 2017 Martin Krause <github@mkrause.info> (http://martinkr.github.io)
 * @license MIT license: https://opensource.org/licenses/MIT
 *
 * @author Martin Krause <github@mkrause.info>
 */

/* eslint-env mocha */

const cliRun = require("./../clirun.js");

const path = require("path");

const thisModulePath = "chigai";
const thisModulePathFull = path.join(__dirname, "./../../bin/", thisModulePath);

describe("the cli command \"reference\" ", () => {

	beforeEach(() => {
	});

	describe("works as expected", () => {

		it("should exit with \"1\" if there's an error", (async () => {
			let x = await cliRun(thisModulePathFull);
			(x.code).should.equal(1);
		}));

		it("should exit with \"0\" if there's no error", (async () => {
			let x = await cliRun([thisModulePathFull, "reference", "http://www.example.com", "-d"].join(" "));
			(x.code).should.equal(0);
		}));

		it("should require at least one argument (the uri)", (async () => {
			let x = await cliRun([thisModulePathFull, "reference", ].join(" "));
			(x.stderr).should.contain('Not enough non-option arguments: got 0');
		}));

		it("should get the uri from the arguments", (async () => {
			let x = await cliRun([thisModulePathFull, "reference", "myuri", "-d"].join(" "));
			(x.stdout).should.contain(`"myuri"`);
		}))

		it("should call the core module's reference API", (async () => {
			let x = await cliRun([thisModulePathFull, "reference", "http://www.example.com", "-d"].join(" "));
			(x.stdout).should.contain('[chigai-core] called "reference"');
		}));

	});
});
