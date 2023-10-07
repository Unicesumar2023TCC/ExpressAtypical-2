const Word = require('../controllers/word');

jest.mock('../models/word', () => ({
  getWordsByCategoryId: jest.fn(),
  insertNewWord: jest.fn(),
  checkIfWordExist: jest.fn(),
  updateWordById: jest.fn(),
  deleteWordById: jest.fn(),
}));
jest.mock('../models/user', () => ({
  getUserById: jest.fn(),
}));

const mockWordModel = require('../models/word');
const mockUsersModel = require('../models/user');

test('fail to create new word if name is empty', async () => {
  mockWordModel.insertNewWord.mockResolvedValue(false);

  const data = {
    idCategory: 1,
    name: '',
  };

  try {
    await Word.insertNewWord(data);
  } catch (error) {
    expect(error.message).toBe('Erro ao inserir nova palavra: Nome da palavra é obrigatório');
  }
});



test('block get active words for non-admin user', async () => {
  const authenticatedUserId = 2;
  const idCategory = 1;

  mockUsersModel.getUserById.mockResolvedValue([{ id: authenticatedUserId, type: 'Responsible' }]);

  try {
    await Word.getWordsByCategoryId(idCategory, authenticatedUserId);
  } catch (error) {
    expect(error.message).toBe('Erro ao buscar palavras por categoria: Usuário não autorizado');
  }
});



test('block update word for non-admin user', async () => {
  const authenticatedUserId = 2;
  const data = {
    idUser: 1,
    name: 'Familia'
  };

  mockUsersModel.getUserById.mockResolvedValue([{ id: authenticatedUserId, type: 'Responsible' }]);

  try {
    await Word.updateWordById(data, authenticatedUserId);
  } catch (error) {
    expect(error.message).toBe('Erro ao editar palavra: Usuário não autorizado');
  }
});



test('block delete word for non-admin user', async () => {
  const authenticatedUserId = 2;
  const idUser = 1;

  mockUsersModel.getUserById.mockResolvedValue([{ id: authenticatedUserId, type: 'Responsible' }]);

  try {
    await Word.deleteWordById(idUser, authenticatedUserId);
  } catch (error) {
    expect(error.message).toBe('Erro ao excluir palavra: Usuário não autorizado');
  }
});