const Profile = require('../controllers/profile');
const mockUsersModel = require('../models/user');
const mockProfileModel = require('../models/profile');

jest.mock('../models/profile', () => ({
  getProfilesByUserId: jest.fn(),
  insertNewProfile: jest.fn(),
  updateProfile: jest.fn(),
  deleteProfileById: jest.fn()
}));
jest.mock('../models/user', () => ({
  getUserById: jest.fn(),
}));



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

test('block get active profiles for non-admin user', async () => {
  const authenticatedUserId = 2;
  const idUser = 1;

  mockUsersModel.getUserById.mockResolvedValue([{ id: authenticatedUserId, type: 'Responsible' }]);

  try {
    await Profile.getProfilesByUserId(idUser, authenticatedUserId);
  } catch (error) {
    expect(error.message).toBe('Erro ao buscar perfis: Usuário não autorizado');
  }
});



test('block update profile for non-admin user', async () => {
  const authenticatedUserId = 2;
  const data = {
    idUser: 1,
    name: 'Familia'
  };

  mockUsersModel.getUserById.mockResolvedValue([{ id: authenticatedUserId, type: 'Responsible' }]);

  try {
    await Profile.updateProfile(data, authenticatedUserId);
  } catch (error) {
    expect(error.message).toBe('Erro ao buscar perfil: Usuário não autorizado');
  }
});



test('block delete profile for non-admin user', async () => {
  const authenticatedUserId = 2;
  const idUser = 1;

  mockUsersModel.getUserById.mockResolvedValue([{ id: authenticatedUserId, type: 'Responsible' }]);

  try {
    await Profile.deleteProfileById(idUser, authenticatedUserId);
  } catch (error) {
    expect(error.message).toBe('Erro ao excluir perfil: Usuário não autorizado');
  }
});
