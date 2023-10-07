const Category = require('../controllers/category');

jest.mock('../models/category', () => ({
  getCategoriesByUserId: jest.fn(),
  insertNewCategory: jest.fn(),
  getCategoryByNameAndUser: jest.fn(),
  updateCategory: jest.fn(),
  deleteCategoryById: jest.fn()
}));

const mockCategoryModel = require('../models/category');

test('fail to create new category if name is empty', async () => {
  const data = {
    idUser: 1,
    name: ''
  };

  try {
    await Category.insertNewCategory(data);
  } catch (error) {
    expect(error.message).toBe('Nome da categoria inválido');
  }
});

test('block add new category with matching name', async () => {
  const data = {
    idUser: 1,
    name: 'Familia'
  };

  mockCategoryModel.getCategoryByNameAndUser.mockResolvedValue([{}]);

  try {
    await Category.insertNewCategory(data);
  } catch (error) {
    expect(error.message).toBe('Categoria já existe para este usuário');
  }
});
