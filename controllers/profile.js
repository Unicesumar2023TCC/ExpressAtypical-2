const ProfileModel = require('../models/profile');
const UserController = require('./user') 

module.exports = class Profile {

    static async getProfilesByUserId(id, authenticatedId){
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

            return await ProfileModel.getProfilesByUserId(id);
        } catch (error) {
            throw new Error(`Erro ao buscar perfis: ${error.message}`);
        }
    }

    static async insertNewProfile(data){
        if (!data.name) {
            throw new Error('Nome inválido');
        }

        if (!data.idUser) {
            throw new Error('Usuário inválido');
        }

        if (!data.birthdate) {
            throw new Error('Data de nascimento inválida');
        }

        try {
            return await ProfileModel.insertNewProfile(data);
        } catch (error) {
            throw new Error(`Erro ao inserir novo perfil: ${error.message}`);
        }
    }

    static async updateProfile(data, authenticatedId){
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }
          
            const authenticatedUser = await UserController.getUserById(authenticatedId)

            if(authenticatedUser.id != data.id && authenticatedUser.type != 'Admin'){
                throw new Error('Usuário não autorizado')
            }

            return await ProfileModel.updateProfile(data);
        } catch (error) {
            throw new Error(`Erro ao atualizar perfil: ${error.message}`);
        }
    }

    static async deleteProfileById(id, authenticatedId){
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

            return await ProfileModel.deleteProfileById(id);
        } catch (error) {
            throw new Error(`Erro ao excluir perfil: ${error.message}`);
        }
    }
}
