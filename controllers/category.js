const CategoryModel = require('../models/category');

module.exports = class Category {

    static async getCategoriesByUserId(id){
        try {
            return await CategoryModel.getCategoriesByUserId(id);
        } catch (error) {
            throw new Error(`Erro ao buscar categorias: ${error.message}`);
        }
    }

    static async insertNewCategory(data){
        if(!data.name) {
            throw new Error('Nome da categoria inválido');
        }

        const categoryExists = await this.checkIfCategoryExist(data);
        if (categoryExists) {
            throw new Error('Categoria já existe para este usuário');
            
        }

        try {
            return await CategoryModel.insertNewCategory(data);
        } catch (error) {
            throw new Error(`Erro ao inserir nova categoria: ${error.message}`);
        }
    }

    static async checkIfCategoryExist(data){
        try {
            const category = await CategoryModel.getCategoryByNameAndUser(data);
            return category.length > 0;
        } catch (error) {
            throw new Error(`Erro ao verificar se a categoria já existe: ${error.message}`);
        }
    }

    static async updateCategory(data){
        try {
            return await CategoryModel.updateCategory(data);
        } catch (error) {
            throw new Error(`Erro ao atualizar categoria: ${error.message}`);
        }
    }

    static async deleteCategoryById(id){
        try {
            return await CategoryModel.deleteCategoryById(id);
        } catch (error) {
            throw new Error(`Erro ao excluir categoria: ${error.message}`);
        }
    }
}
