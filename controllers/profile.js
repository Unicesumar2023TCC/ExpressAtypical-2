const ProfileModel = require('../models/profile');

module.exports = class Profile {

    static async getProfilesByUserId(id){
        try {
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

    static async updateProfile(data){
        try {
            return await ProfileModel.updateProfile(data);
        } catch (error) {
            throw new Error(`Erro ao atualizar perfil: ${error.message}`);
        }
    }

    static async deleteProfileById(id){
        try {
            return await ProfileModel.deleteProfileById(id);
        } catch (error) {
            throw new Error(`Erro ao excluir perfil: ${error.message}`);
        }
    }
}
