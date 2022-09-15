const { exec } = require("child_process");

module.exports = async(cmd) => {
	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
			}
			// console.log(`stdout: ${stdout}`);
			return resolve();
		});
	});
};