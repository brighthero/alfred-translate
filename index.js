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
	const fn = async(val, i) => {
		const res = await translate(query, {
			from,
			to: val
		})

		output[i] = {
			title: res.text,
			subtitle: `Lang:${langs[to[i]]}, AC:${res.from.text.value}`,
			arg: res.text,
			icon: {
				path: '/Users/matthias/Downloads/deu.png'
			}
		};
	};

	var actions = to.map(fn);
	var results = Promise.all(actions);
	results.then(() => {
		alfy.output(output);
	});

}