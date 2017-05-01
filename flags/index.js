const path = require('path');
const fs = require('fs');

function flags(lang) {
	let flagPath = path.join(__dirname, '/assets', `${lang}.png`);
	if (fs.existsSync(flagPath)) {
		return flagPath;
	} else {
		return path.join(__dirname, '..', 'icon.png');
	}
}

module.exports = flags;