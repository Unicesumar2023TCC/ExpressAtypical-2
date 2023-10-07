const Word = require('../controllers/word');

jest.mock('../models/word', () => ({
  getWordsByCategoryId: jest.fn(),
  insertNewWord: jest.fn(),
  checkIfWordExist: jest.fn(),
  updateWordById: jest.fn(),
  deleteWordById: jest.fn(),
}));

const mockWordModel = require('../models/word');

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

