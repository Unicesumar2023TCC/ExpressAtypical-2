const UsersModel = require('../models/user');

module.exports = class User {

    static async getAllUsers(){
        try {
            return await UsersModel.getAllUsers(authenticatedId);
        } catch (error) {
            throw new Error(`Erro ao buscar usuários: ${error.message}`);
        }
    }

    static async getAllActiveUsers(authenticatedId){
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }

            const authenticatedUser = await this.getUserById(authenticatedId)
            if(authenticatedUser.type != 'Admin'){
                throw new Error('Usuário não autorizado')
            }

            return await UsersModel.getAllActiveUsers();
        } catch (error) {
            throw new Error(`Erro ao buscar usuários ativos: ${error.message}`);
        }
    }

    static async getUser(id, authenticatedId){
        
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }

            const authenticatedUser = await this.getUserById(authenticatedId)

            if(authenticatedUser.id != id && authenticatedUser.type != 'Admin'){
                throw new Error('Usuário não autorizado')
            }
            
            return await this.getUserById(id);
        } catch (error) {
            throw new Error(`Erro ao buscar usuário por ID: ${error.message}`);
        }
    }

    static async getUserById(id){
        try {
            if (!id) {
                throw new Error('ID do usuário é obrigatório');
            }
            return await UsersModel.getUserById(id);

        } catch (error) {
            throw new Error(`Erro ao buscar usuário por ID: ${error.message}`);
        }
    }

    static async insertNewUser(data){
        try {
            if (!data.name) {
                throw new Error('Nome é obrigatório');
            }
    
            if (!data.email) {
                throw new Error('Email é obrigatório');
            }
    
            if (!data.password) {
                throw new Error('Senha é obrigatória');
            }
    
            if (!data.phone) {
                throw new Error('Telefone é obrigatório');
            }
    
            if (!data.birthDate) {
                throw new Error('Data de nascimento é obrigatória');
            }
    
            const emailExists = await this.checkIfEmailExist(data.email);
            if (emailExists) {
                throw new Error('Email já está em uso');
            }
    
            return await UsersModel.insertNewUser(data);
        } catch (error) {
            throw new Error(`Erro ao inserir novo usuário: ${error.message}`);
        }
    }
    

    static async checkIfEmailExist(email){
        try {
            if (!email) {
                throw new Error('Email é obrigatório');
            }
            return Boolean((await UsersModel.getActiveUserByEmail(email)).length);
        } catch (error) {
            throw new Error(`Erro ao verificar se o email já está em uso: ${error.message}`);
        }
    }

    static async updateUser(data, authenticatedId){
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }

            const authenticatedUser = await this.getUserById(authenticatedId)

            if(authenticatedUser.id != authenticatedId && authenticatedUser.type != 'Admin'){
                throw new Error('Usuário não autorizado')
            }

            return data
            if (!data.id) {
                throw new Error('ID do usuário é obrigatório');
            }
            

            return await UsersModel.updateUser(data);
        } catch (error) {
            throw new Error(`Erro ao atualizar usuário: ${error.message}`);
        }
    }

    static async deleteUserById(id, authenticatedId){
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }

            if (!id) {
                throw new Error('ID do usuário é obrigatório');
            }
            
            const authenticatedUser = await this.getUserById(authenticatedId)

            if(authenticatedUser.id != id && authenticatedUser.type != 'Admin'){
                throw new Error('Usuário não autorizado')
            }

            return await UsersModel.deleteUserById(id);
        } catch (error) {
            throw new Error(`Erro ao excluir usuário: ${error.message}`);
        }
    }

    static async checkUserLogin(email){
        try {
            if (!email) {
                throw new Error('Email é obrigatório');
            }
            return await UsersModel.checkUserLogin(email);
        } catch (error) {
            throw new Error(`Erro ao verificar o login do usuário: ${error.message}`);
        }
    }
}
