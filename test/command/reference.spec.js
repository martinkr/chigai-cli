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
const fs = require("fs-extra-plus");

const port = 3000;
const server = require("chigai-mock-server");
let testServer;

const uriDynamic = `http://localhost:${port}/random`;
const uriStatic = `http://localhost:${port}/static`;

const thisModulePath = "chigai";
const thisModulePathFull = path.join(__dirname, "./../../bin/", thisModulePath);
const proxyquire = require("proxyquire");

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
			let x = await cliRun([thisModulePathFull, "reference", uriStatic, "-d"].join(" "));
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
			let x = await cliRun([thisModulePathFull, "reference", uriStatic, "-d"].join(" "));
			(x.stdout).should.contain('[chigai-core] called "reference"');
		}));

	});


	describe.skip("should call the \"core\"-package ", () => {

		let thisModuleProxied;
		// create stubs for spying on them
		let stubModule = {
			"regression": (uri, options) => new Promise((resolve, reject) => {
				resolve(true);
			}),
			"reference": (uri, options) => new Promise((resolve, reject) => {
				resolve(true);
			})
		};

		let spyCoreRegression = sinon.spy(stubModule, "regression");
		let spyCoreReference = sinon.spy(stubModule, "reference");

		before(() => {

			// mock dependencies
			thisModuleProxied = proxyquire("./../../bin/" + thisModulePath, {
				"chigai-core": {
					"regression": spyCoreRegression,
					"reference": spyCoreReference
				}
			});


		});

		beforeEach(() => {
			spyCoreRegression.resetHistory();
			spyCoreReference.resetHistory();
		});

		it("should pass the URI as the first parameters", (async () => {
			await cliRun([thisModuleProxied, "reference", "http://localhost:3000/random"].join(" "));
			spyCoreReference.should.have.been.calledWith("http://localhost:3000/random", {})
			spyCoreRegression.should.not.have.been.called();
		}));

	});

});
