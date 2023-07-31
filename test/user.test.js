const User = require('../controllers/user')


 test('block add new user with matching e-mail', async () => {
  const data = [];
  data.name = 'teste';
  data.email = 'teste@gmail.com';
  data.password = 'senha123';
  data.phone = '(41)98788-4404';
  data.birthDate = new Date('2023-12-05');
  expect(await User.insertNewUser(data)).toBe(false);
});

test('block add new user with empty name', async () => {
  const data = [];
  data.name = '';
  data.email = 'teste@gmail.com';
  data.password = 'senha123';
  data.phone = '(41)98788-4404';
  data.birthDate = new Date('2023-12-05');
  expect(await User.insertNewUser(data)).toBe(false);
});

test('block add new user with empty email', async () => {
  const data = [];
  data.name = 'teste';
  data.email = '';
  data.password = 'senha123';
  data.phone = '(41)98788-4404';
  data.birthDate = new Date('2023-12-05');
  expect(await User.insertNewUser(data)).toBe(false);
});

test('block add new user with empty password', async () => {
  const data = [];
  data.name = 'teste';
  data.email = 'teste@gmail.com';
  data.password = '';
  data.phone = '(41)98788-4404';
  data.birthDate = new Date('2023-12-05');
  expect(await User.insertNewUser(data)).toBe(false);
});

test('block add new user with empty phone', async () => {
  const data = [];
  data.name = 'teste';
  data.email = 'teste@gmail.com';
  data.password = 'senha123';
  data.phone = '';
  data.birthDate = new Date('2023-12-05');
  expect(await User.insertNewUser(data)).toBe(false);
});

test('block add new user with empty birthdate', async () => {
  const data = [];
  data.name = 'teste';
  data.email = 'teste@gmail.com';
  data.password = 'senha123';
  data.phone = '(41)98788-4404';
  data.birthDate = '';
  expect(await User.insertNewUser(data)).toBe(false);
});