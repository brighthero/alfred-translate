const alfy = require('alfy');
const translate = require('google-translate-api');

// default lang settings
let from = 'auto';
let to = ['en', 'fr', 'es', 'de', 'zh-cn', 'ja'];

// TODO: Use actual query
let query = 'Heute ist ein schöner Tag.';

const langParse = /^[a-z]{2,3}(?:-[A-Z]{2,3}(?:-[a-zA-Z]{4})?)?(?::[a-z]{2,3}(?:-[A-Z]{2,3}(?:-[a-zA-Z]{4})?)?)?\s/;
const langArr = alfy.input.match(langParse);

if (langArr) {
	const parseArr = langArr[0].split(':');
	to = parseArr[0].replace(/\s/g, "");

	if (parseArr[1]) {
		from = parseArr[0].replace(/\s/g, "");
		to = [];
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
	console.log(output);

	alfy.output(output);
}