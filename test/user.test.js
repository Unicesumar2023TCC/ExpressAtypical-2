const User = require('../controllers/user');
const UsersModel = require('../models/user');

jest.mock('../models/user', () => ({
  getAllUsers: jest.fn(),
  getAllActiveUsers: jest.fn(),
  getUserById: jest.fn(),
  insertNewUser: jest.fn(),
  getActiveUserByEmail: jest.fn(),
  updateUser: jest.fn(),
  deleteUserById: jest.fn(),
  checkUserLogin: jest.fn(),
}));

const mockUsersModel = require('../models/user');

test('block add new user with matching e-mail', async () => {
  mockUsersModel.getActiveUserByEmail.mockResolvedValue([{ id: 1 }]);

  const data = {
    name: 'teste',
    email: 'teste@gmail.com',
    password: 'senha123',
    phone: '(41)98788-4404',
    birthDate: new Date('2023-12-05')
  };

  try {
    await User.insertNewUser(data);
  } catch (error) {
    expect(error.message).toBe('Erro ao inserir novo usuário: Email já está em uso');
  }
});

test('block add new user with empty name', async () => {
  const data = {
    name: '',
    email: 'teste@gmail.com',
    password: 'senha123',
    phone: '(41)98788-4404',
    birthDate: new Date('2023-12-05')
  };

  try {
    await User.insertNewUser(data);
  } catch (error) {
    expect(error.message).toBe('Erro ao inserir novo usuário: Nome é obrigatório');
  }
});

test('block add new user with empty email', async () => {
  const data = {
    name: 'teste',
    email: '',
    password: 'senha123',
    phone: '(41)98788-4404',
    birthDate: new Date('2023-12-05')
  };

  try {
    await User.insertNewUser(data);
  } catch (error) {
    expect(error.message).toBe('Erro ao inserir novo usuário: Email é obrigatório');
  }
});

test('block add new user with empty password', async () => {
  const data = {
    name: 'teste',
    email: 'teste@gmail.com',
    password: '',
    phone: '(41)98788-4404',
    birthDate: new Date('2023-12-05')
  };

  try {
    await User.insertNewUser(data);
  } catch (error) {
    expect(error.message).toBe('Erro ao inserir novo usuário: Senha é obrigatória');
  }
});

test('block add new user with empty phone', async () => {
  const data = {
    name: 'teste',
    email: 'teste@gmail.com',
    password: 'senha123',
    phone: '',
    birthDate: new Date('2023-12-05')
  };

  try {
    await User.insertNewUser(data);
  } catch (error) {
    expect(error.message).toBe('Erro ao inserir novo usuário: Telefone é obrigatório');
  }
});

test('block add new user with empty birthdate', async () => {
  const data = {
    name: 'teste',
    email: 'teste@gmail.com',
    password: 'senha123',
    phone: '(41)98788-4404',
    birthDate: ''
  };

  try {
    await User.insertNewUser(data);
  } catch (error) {
    expect(error.message).toBe('Erro ao inserir novo usuário: Data de nascimento é obrigatória');
  }
});

test('block get all active users for non-admin user', async () => {
  const authenticatedUser = {
    id: 2, // Assuming this is a non-admin user
    type: 'Responsible', 
  };

  mockUsersModel.getUserById.mockResolvedValue([{ id: authenticatedUser.id, type: authenticatedUser.type }]);

  try {
    await User.getAllActiveUsers(authenticatedUser.id);
  } catch (error) {
    expect(error.message).toBe('Erro ao buscar usuários ativos: Usuário não autorizado');
  }
});

test('get user by ID for admin user', async () => {
  const authenticatedUserId = 1;
  const userId = 3;

  mockUsersModel.getUserById.mockResolvedValue([{ id: authenticatedUserId, type: 'Admin' }]);

  try {
    await User.getUser(userId, authenticatedUserId);
  } catch (error) {
    expect(error.message).toBe('Erro ao buscar usuário por ID: Usuário não autorizado');
  }
});

test('block update user for non-admin user', async () => {
  const authenticatedUser = {
    id: 2,
  };

  const data = {
    id: 1
  };

  try {
    await User.updateUser(data, authenticatedUser.id);
  } catch (error) {
    expect(error.message).toBe('Erro ao atualizar usuário: Usuário não autorizado');
  }
});

test('block delete user by ID for non-admin user', async () => {
  const authenticatedUserId = 2;
  const userId = 1;

  try {
    await User.deleteUserById(userId, authenticatedUserId);
  } catch (error) {
    expect(error.message).toBe('Erro ao excluir usuário: Usuário não autorizado');
  }
});
