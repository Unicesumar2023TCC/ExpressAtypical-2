const Profile = require('../controllers/profile');

jest.mock('../models/profile', () => ({
  getProfilesByUserId: jest.fn(),
  insertNewProfile: jest.fn(),
  updateProfile: jest.fn(),
  deleteProfileById: jest.fn()
}));

const mockProfileModel = require('../models/profile');

test('block add new user with empty name', async () => {
  const data = {
    name: '',
    idUser: 1,
    birthDate: new Date('2023-12-05')
  };
  mockProfileModel.insertNewProfile.mockRejectedValue(new Error('Nome inválido'));
  
  try {
    await Profile.insertNewProfile(data);
  } catch (error) {
    expect(error.message).toBe('Nome inválido');
  }
});

test('block add new user with empty idUser', async () => {
  const data = {
    name: 'teste',
    idUser: '',
    birthDate: new Date('2023-12-05')
  };
  mockProfileModel.insertNewProfile.mockRejectedValue(new Error('Usuário inválido'));

  try {
    await Profile.insertNewProfile(data);
  } catch (error) {
    expect(error.message).toBe('Usuário inválido');
  }
});

test('block add new user with empty birthdate', async () => {
  const data = {
    name: 'teste',
    idUser: 1,
    birthDate: ''
  };
  mockProfileModel.insertNewProfile.mockRejectedValue(new Error('Data de nascimento inválida'));

  try {
    await Profile.insertNewProfile(data);
  } catch (error) {
    expect(error.message).toBe('Data de nascimento inválida');
  }
});
