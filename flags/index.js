const path = require('path');

function flags(lang) {
	return path.join(__dirname, '/assets', `${lang}.png`);
}

module.exports = flags;