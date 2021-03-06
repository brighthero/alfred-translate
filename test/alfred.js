import test from 'ava';
import alfyTest from 'alfy-test';

test('translate with defined languages', async t => {
	const alfy = alfyTest();
	const result = await alfy('de:en Alfred kann jetzt übersetzen!');

	t.is(result[0].title, 'Alfred can now translate!');
});

test('input language detected', async t => {
	const alfy = alfyTest();
	const result = await alfy('de:en Alfred kann jetzt übersetzen!');

	t.is(result[0].meta.fromlang, 'de');
});

test('translated language detected', async t => {
	const alfy = alfyTest();
	const result = await alfy('de:en Alfred kann jetzt übersetzen!');

	t.is(result[0].meta.tolang, 'en');
});

test('auto-detect language', async t => {
	const alfy = alfyTest();
	const result = await alfy('Alfred kann jetzt übersetzen!');

	t.is(result[0].title, 'Alfred can now translate!');
	t.is(result[1].title, 'Alfred peut maintenant traduire!');
	t.is(result[2].title, 'Alfred ahora puede traducir!');
});

test('auto-complete suggestions', async t => {
	const alfy = alfyTest();
	const result = await alfy('de Alfred kann jetzt übersetzhhen!');

	t.is(result[0].autocomplete, 'de Alfred kann jetzt übersetzen!');
});

test('dont auto-complete suggestions', async t => {
	const alfy = alfyTest();
	const result = await alfy('de einfach');

	t.falsy(result[0].autocomplete);
});

test('use flag icon', async t => {
	const alfy = alfyTest();
	const result = await alfy('de einfach');

	t.true(result[0].icon.path.indexOf('/flags/assets/de.png') !== -1);
});

test('use default flag icon when correct not available', async t => {
	const alfy = alfyTest();
	const result = await alfy('lo einfach');

	t.false(result[0].icon.path.indexOf('/flags/assets/lo.png') !== -1);
	t.true(result[0].icon.path.indexOf('/icon.png') !== -1);
});