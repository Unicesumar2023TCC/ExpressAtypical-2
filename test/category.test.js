const Category = require('../controllers/category');

jest.mock('../models/category', () => ({
  getCategoriesByUserId: jest.fn(),
  insertNewCategory: jest.fn(),
  getCategoryByNameAndUser: jest.fn(),
  updateCategory: jest.fn(),
  deleteCategoryById: jest.fn()
}));

jest.mock('../models/user', () => ({
  getUserById: jest.fn(),
}));

const mockCategoryModel = require('../models/category');
const mockUsersModel = require('../models/user');

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



test('block get active categories for non-admin user', async () => {
  const authenticatedUserId = 2;
  const idUser = 1;

  mockUsersModel.getUserById.mockResolvedValue([{ id: authenticatedUserId, type: 'Responsible' }]);

  try {
    await Category.getCategoriesByUserId(idUser, authenticatedUserId);
  } catch (error) {
    expect(error.message).toBe('Erro ao buscar categorias: Usuário não autorizado');
  }
});



test('block update categorie for non-admin user', async () => {
  const authenticatedUserId = 2;
  const data = {
    idUser: 1,
    name: 'Familia'
  };

  mockUsersModel.getUserById.mockResolvedValue([{ id: authenticatedUserId, type: 'Responsible' }]);

  try {
    await Category.updateCategory(data, authenticatedUserId);
  } catch (error) {
    expect(error.message).toBe('Erro ao buscar categorias: Usuário não autorizado');
  }
});



test('block delete categorie for non-admin user', async () => {
  const authenticatedUserId = 2;
  const idUser = 1;

  mockUsersModel.getUserById.mockResolvedValue([{ id: authenticatedUserId, type: 'Responsible' }]);

  try {
    await Category.deleteCategoryById(idUser, authenticatedUserId);
  } catch (error) {
    expect(error.message).toBe('Erro ao excluir categoria: Usuário não autorizado');
  }
});