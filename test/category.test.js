const Category = require('../controllers/category')

test('fail to create new category if name is empty', async () => {
  const data = [];
  data.idUser = 1;
  data.name = '';
  expect(await Category.insertNewCategory(data)).toBe(false);
});


 test('block add new category with matching name', async () => {
  const data = [];
  data.idUser = 1;
  data.name = 'Familia';
  expect(await Category.insertNewCategory(data)).toBe(false);
});
