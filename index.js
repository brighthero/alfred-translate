const alfy = require('alfy');
const translate = require('google-translate-api');

const langs = require('./languages.js');
const flags = require('./flags');

// default lang settings
let from = 'auto';
let to = ['en', 'fr', 'es', 'de', 'zh-cn', 'ja'];
const input = alfy.input.match(new RegExp("^(" + langs.code.join('|') + ")(?::(" + langs.code.join('|') + "))?\\s?"));

// Parse lang selection
if (input) {
	to = [];
	const parseArr = input[0].split(':');
	to[0] = parseArr[0].replace(/\s/g, "");

	if (parseArr[1]) {
		from = parseArr[0].replace(/\s/g, "");
		to[0] = parseArr[1].replace(/\s/g, "");
	}
}

// Parse query input
const query = alfy.input.replace(input && input[0] ? input[0] : '', '');

let output = [];

if (query !== '') {
	async function fn(val, i) {
		const res = await translate(query, { from, to: val });

		// TODO: Fix null values in translate response		
		const text = res.text.replace('null', '');

		output[i] = {
			title: text,
			subtitle: `${langs[to[i]]} - AC:${res.from.text.value}`,
			arg: text,
			icon: {
				path: flags(to[i])
			},
			meta: {
				fromlang: from,
				tolang: val
			}
		};

		if (res.from.text.value) {
			output[i].autocomplete = input[0] + res.from.text.value.replace('[', '').replace(']', '');
		}
	};

	var actions = to.map(fn);
	var results = Promise.all(actions)
		.then(() => {
			alfy.output(output);
		});
}