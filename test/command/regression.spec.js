
/**
 * Specs for the cli command "regression"
 *
 * This command sets the last screenshot to be the new regression item.
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
const fs = require("fs-extra-plus");

const port = 3000;
const server = require("chigai-mock-server");
let testServer;

const uriDynamic = `http://localhost:${port}/random`;
const uriStatic = `http://localhost:${port}/static`;

const thisModulePath = "chigai";
const thisModulePathFull = path.join(__dirname, "./../../bin/", thisModulePath);

describe(`the module ${thisModulePath}`, () => {

	describe("works as expected", () => {

		afterEach((done) => {
			testServer.close();
			done();
		});

		beforeEach(async () => {
			testServer = server.listen(port);
			await fs.emptyDir(path.join("./", "screenshots"));
		});

		it("should exit with \"1\" if there's an error", (async () => {
			let x = await cliRun(thisModulePathFull);
			(x.code).should.equal(1);
		}));

		it("should exit with \"0\" if there's no error", (async () => {
			let x = await cliRun([thisModulePathFull, "regression", uriStatic, "-d"].join(" "));
			(x.code).should.equal(0);
		}));

		it("should exit with \"1\" if the comparison fails", (async () => {
			let x = await cliRun([thisModulePathFull, "regression", uriDynamic, "-d"].join(" "));
			(x.code).should.equal(0);
		}));

		it("should require at least one argument (the uri)", (async () => {
			let x = await cliRun([thisModulePathFull, "regression", ].join(" "));
			(x.stderr).should.contain('Not enough non-option arguments: got 0');
		}));

		it("should get the uri from the arguments", (async () => {
			let x = await cliRun([thisModulePathFull, "regression", "myuri", "-d"].join(" "));
			(x.stdout).should.contain(`"myuri"`);
		}))

		it("should call the core module's regression API", (async () => {
			let x = await cliRun([thisModulePathFull, "regression", uriStatic, "-d"].join(" "));
			(x.stdout).should.contain('[chigai-core] called "regression"');
		}));

	});
});
