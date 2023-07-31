const Word = require('../controllers/word')

test('fail to create new word if name is empty', async () => {
  const data = [];
  data.idCategory = 1;
  data.name = '';
  expect(await Word.insertNewWord(data)).toBe(false);
});


 test('block add new word with matching name', async () => {
  const data = [];
  data.idCategory = 1;
  data.name = 'Pai';
  expect(await Word.insertNewWord(data)).toBe(false);
});
