/* eslint-env mocha */

const cliRun = require("./clirun.js");

const fs = require("fs-extra-plus");

const timeout = (fn) => new Promise((resolve) => setTimeout(() => resolve(fn()), 250));


describe("sanity checks for the mocha test suite", () => {
	describe("the mocha async wrapper should work as expected", () => {

		it("should execute a simple async/await mocha test", (async () => {
			let x = await timeout(() => "Hello World!");
			(x).should.equal("Hello World!");
		}));

		it("should work as expected with mutliple async / awaits", (async () => {
			let x = await timeout(() => "Hello World!x");
			let y = await timeout(() => "Hello World!y");
			let z = await timeout(() => "Hello World!z");
			(x).should.equal("Hello World!x");
			(y).should.equal("Hello World!y");
			(z).should.equal("Hello World!z");
		}));

		it("should work with the filesystem", (async () => {
			let _fileTrue = "./test/sanity.spec.js";
			let _fileFalse = "./test/none.txt";
			let x = await timeout(() => fs.pathExists(_fileTrue));
			let y = await timeout(() => fs.pathExists(_fileFalse));
			(x).should.be.ok;
			(y).should.not.be.ok;
		}));

	});

	describe("cli runner should work as expected", () => {

		it("should return \"code = 0\" if there's a clean exit", (async () => {
			let x = await cliRun("ls");
			(x.code).should.equal(0);
		}));

		it("should return \"code != 0 \" if there's no clean exit ", (async () => {
			let x = await cliRun("ls -2");
			(x.code).should.not.equal(0);
		}));

		it("should return stdout", (async () => {
			let x = await cliRun("ls");
			(x.stdout).should.contain("test");
		}));

		it("should return stderr", (async () => {
			let x = await cliRun("ls invalid\n");
			(x.stderr).should.contain("No such file or directory");
		}));

		it("should work with a single flag", (async () => {
			let x = await cliRun("ls -a");
			(x.stdout).should.contain(".gitignore");
		}));

		it("should work with a multiple flags", (async () => {
			let x = await cliRun("ls -a -l");
			(x.stdout).should.contain("..")
						.and.contain(":")
						.and.contain(".gitignore");
		}));

	});
});
