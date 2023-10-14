const CategoryModel = require('../models/category');
const UserController = require('./user') 
const Log = require('../models/log');

module.exports = class Category {

    static async getCategoriesByUserId(id, authenticatedId){
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }

            if (!id) {
                throw new Error('ID do usuário é obrigatório');
            }
            
            const authenticatedUser = await UserController.getUserById(authenticatedId)

            if(authenticatedUser.id != id && authenticatedUser.type != 'Admin'){
                throw new Error('Usuário não autorizado')
            }

            return await CategoryModel.getCategoriesByUserId(id);
        } catch (error) {
            throw new Error(`Erro ao buscar categorias: ${error.message}`);
        }
    }

    static async getcategorieById(id){
        try {

            if (!id) {
                throw new Error('ID do usuário é obrigatório');
            }

            return await CategoryModel.getCategorieById(id);
            
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
            
            let response = await CategoryModel.insertNewCategory(data);
            Log.addLog({
                origem: 'Category',
                action: 'Create',
                idReference: response.id,
                idUser: data.idUser
            })
            return response
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

    static async updateCategory(data, authenticatedId){
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }
          
            const authenticatedUser = await UserController.getUserById(authenticatedId)
            const category = await Category.getcategorieById(data.id);

            if(authenticatedUser.id != category.idUser && authenticatedUser.type != 'Admin'){
                throw new Error('Usuário não autorizado')
            }
            

            let response = await CategoryModel.updateCategory(data);
            Log.addLog({
                origem: 'Category',
                action: 'update',
                idReference: response.id,
                idUser: authenticatedId
            })
            return response
        } catch (error) {
            throw new Error(`Erro ao atualizar categoria: ${error.message}`);
        }
    }

    static async deleteCategoryById(id, authenticatedId){
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }

            if (!id) {
                throw new Error('ID do usuário é obrigatório');
            }
            
            const authenticatedUser = await UserController.getUserById(authenticatedId)
            const category = await Category.getcategorieById(id);

            if(authenticatedUser.id != category.idUser && authenticatedUser.type != 'Admin'){
                throw new Error('Usuário não autorizado')
            }

            let response = await CategoryModel.deleteCategoryById(id);
            Log.addLog({
                origem: 'Category',
                action: 'delete',
                idReference: response.id,
                idUser: authenticatedId
            })
            return response
        } catch (error) {
            throw new Error(`Erro ao excluir categoria: ${error.message}`);
        }
    }
}
