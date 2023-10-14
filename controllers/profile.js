const ProfileModel = require('../models/profile');
const UserController = require('./user') 
const Log = require('../models/log');

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

        if (data.birthdate && data.birthdate == '') {
            throw new Error('Data de nascimento inválida');
        }

        try {
            let response = await ProfileModel.insertNewProfile(data);
            Log.addLog({
                origem: 'Profile',
                action: 'create',
                idReference: response.id,
                idUser: data.idUser
            })
            return response
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

            let response = await ProfileModel.updateProfile(data);
            Log.addLog({
                origem: 'Profile',
                action: 'update',
                idReference: response.id,
                idUser: authenticatedId
            })
            return response
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

            let response = await ProfileModel.deleteProfileById(id);
            Log.addLog({
                origem: 'Profile',
                action: 'delete',
                idReference: response.id,
                idUser: authenticatedId
            })
            return response
        } catch (error) {
            throw new Error(`Erro ao excluir perfil: ${error.message}`);
        }
    }
}
