
const spawn = require("cross-spawn");
// const spawn = require("child_process").spawn;


module.exports = (cmd) =>  {
	return new Promise((resolve, reject) => {

		if (typeof (cmd) !== "string") {
			throw new Error(`CLIRUN: invalid argument. Expected ${cmd} to be a string.`)
		}

		const _cmds = cmd.split(" ");
		let _stdout = "";
		let _stderr = "";
		let _bin;

		try {
			_bin = spawn(_cmds.slice(0, 1).toString(), _cmds.slice(1));
		} catch (err) {
			console.log("CLIRUN: Error", err)
			return reject(err);
		}

		_bin.stdout.setEncoding("utf8")
		_bin.stdout.on("data", (str) => {
			console.log("CLIRUN: _stdout", str)
			_stdout += str;
		})

		_bin.stderr.setEncoding("utf8")
		_bin.stderr.on("data", (str) => {
			console.log("CLIRUN: stderr", str)
			_stderr += str;
		})

		_bin.on("close", (code) => {
			console.log("CLIRUN: closes with", code)
			return resolve({ "code": code, "stdout": _stdout, "stderr": _stderr });
		})

	});
};

