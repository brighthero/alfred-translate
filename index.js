const alfy = require('alfy');
const translate = require('google-translate-api');

// default lang settings
let from = 'auto';
let to = ['en', 'fr', 'es', 'de', 'zh-cn', 'ja'];

const langParse = /^[a-z]{2,3}(?:-[A-Z]{2,3}(?:-[a-zA-Z]{4})?)?(?::[a-z]{2,3}(?:-[A-Z]{2,3}(?:-[a-zA-Z]{4})?)?)?\s/;
const langArr = alfy.input.match(langParse);
let options = {};

if (langArr) {
	const parseArr = langArr[0].split(':');
	to = parseArr[0].replace(/\s/g, "");

	if (parseArr[1]) {
		from = parseArr[0].replace(/\s/g, "");
		to = [];
		to[0] = parseArr[1].replace(/\s/g, "");
	}
}

console.log(from, to)

translate(alfy.input, { to: 'en' }).then(res => {

	alfy.output([
		{
			title: res.text,
			autocomplete: "Desktop",
		}
	]);
}).catch(err => {
     console.error(err);
});
