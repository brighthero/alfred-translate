const alfy = require('alfy');
const translate = require('google-translate-api');

const langs = require('./languages.js');

// default lang settings
let from = 'auto';
let to = ['en', 'fr', 'es', 'de', 'zh-cn', 'ja'];

const langParse = new RegExp("^(" + langs.code.join('|') + ")(?::(" + langs.code.join('|') + "))?\\s");
const langArr = alfy.input.match(langParse);

// Parse lang selection
if (langArr) {
	to = [];
	const parseArr = langArr[0].split(':');
	to[0] = parseArr[0].replace(/\s/g, "");

	if (parseArr[1]) {
		from = parseArr[0].replace(/\s/g, "");
		to[0] = parseArr[1].replace(/\s/g, "");
	}
}

let output = [];

// Parse query input
const query = alfy.input.replace(langArr && langArr[0] ? langArr[0] : '', '');

if (query !== '') {
	to.forEach((val, i) => {
		translate(query, {
			from,
			to: val
		}).then(res => {
			// console.log(res);
			output.push({
				title: res.text,
				subtitle: res.from.text.value,
				arg: res.text
			});
			if (to.length == output.length) done();
		}).catch(err => {
			console.error(err);
		});
	});
} else {
	output.push({
		title: 'No text input',
		subtitle: 'Please enter the text you want to get translated!',
		arg: ''
	});
}

function done() {
	//console.log(from, to);
	//console.log(output);

	alfy.output(output);
}