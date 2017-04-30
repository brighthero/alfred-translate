const alfy = require('alfy');
const translate = require('google-translate-api');

const langs = require('./languages.js');

// default lang settings
let from = 'auto';
let to = ['en', 'fr', 'es', 'de', 'zh-cn', 'ja'];

// TODO: Use actual query
let query = 'Heute ist ein schöner Tag.';

const langParse = new RegExp("^(" + langs.code.join('|') + ")(?::(" + langs.code.join('|') + "))?\\s");
const langArr = alfy.input.match(langParse);

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

function done() {
	console.log(from, to);
	//console.log(output);

	alfy.output(output);
}