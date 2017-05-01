import test from 'ava';
import alfyTest from 'alfy-test';

test('Translate with defined languages', async t => {
	const alfy = alfyTest();
	const result = await alfy('de:en Alfred kann jetzt übersetzen!');

	t.is(result[0].title, 'Alfred can now translate!');
});

test('Input language detected', async t => {
	const alfy = alfyTest();
	const result = await alfy('de:en Alfred kann jetzt übersetzen!');

	t.is(result[0].meta.fromlang, 'de');
});

test('Translated language detected', async t => {
	const alfy = alfyTest();
	const result = await alfy('de:en Alfred kann jetzt übersetzen!');

	t.is(result[0].meta.tolang, 'en');
});

test('Auto-detect language', async t => {
	const alfy = alfyTest();
	const result = await alfy('Alfred kann jetzt übersetzen!');

	t.is(result[0].title, 'Alfred can now translate!');
	t.is(result[1].title, 'Alfred peut maintenant traduire!');
	t.is(result[2].title, 'Alfred ahora puede traducir!');
});

test('Auto-complete suggestions', async t => {
	const alfy = alfyTest();
	const result = await alfy('de Alfred kann jetzt übersetzhhen!');

	t.is(result[0].autocomplete, 'de Alfred kann jetzt übersetzen!');
});

test('Dont auto-complete suggestions', async t => {
	const alfy = alfyTest();
	const result = await alfy('de einfach');

	t.falsy(result[0].autocomplete);
});