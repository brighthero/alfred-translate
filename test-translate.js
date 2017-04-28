import test from 'ava';
import translate from 'google-translate-api';

test('Google Translate functionality', async t => {
	await translate('Haus', {
		from: 'de',
		to: 'en'
	}).then(res => {
		t.is(res.text, 'House')
	}).catch(err => {
		t.false(err);
	});
});