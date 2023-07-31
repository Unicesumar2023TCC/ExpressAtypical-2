const Profile = require('../controllers/profile')

test('block add new user with empty name', async () => {
  const data = [];
  data.name = '';
  data.idUser = 1;
  data.birthDate = new Date('2023-12-05');
  expect(await Profile.insertNewProfile(data)).toBe(false);
});


test('block add new user with empty idUser', async () => {
  const data = [];
  data.name = 'teste';
  data.idUser = '';
  data.birthDate = new Date('2023-12-05');
  expect(await Profile.insertNewProfile(data)).toBe(false);
});

test('block add new user with empty birthdate', async () => {
  const data = [];
  data.name = 'teste';
  data.idUser = 1;
  data.birthDate = '';
  expect(await Profile.insertNewProfile(data)).toBe(false);
});