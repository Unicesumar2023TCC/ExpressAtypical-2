const RewardModel = require('../models/reward');
const UserController = require('./user') 
const Log = require('../models/log');

module.exports = class Reward {

    static async getRewardsByUserId(id, authenticatedId){
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

            return await RewardModel.getRewardsByUserId(id);
        } catch (error) {
            throw new Error(`Erro ao buscar perfis: ${error.message}`);
        }
    }

    static async insertNewReward(data){
        if (!data.name) {
            throw new Error('Nome inválido');
        }

        if (!data.idProfile) {
            throw new Error('Usuário inválido');
        }


        try {
            let response = await RewardModel.insertNewReward(data);
            
            Log.addLog({
                origem: 'Reward',
                action: 'create',
                idReference: response.id,
                idProfile: data.idProfile
            })
            return response
        } catch (error) {
            throw new Error(`Erro ao inserir novo recompensa: ${error.message}`);
        }
    }

    static async updateReward(data, authenticatedId){
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }

            let response = await RewardModel.updateReward(data);
            Log.addLog({
                origem: 'Reward',
                action: 'update',
                idReference: response.id,
                idProfile: authenticatedId
            })
            return response
        } catch (error) {
            throw new Error(`Erro ao atualizar recompensa: ${error.message}`);
        }
    }

    static async deleteRewardById(id, authenticatedId){
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }

            if (!id) {
                throw new Error('ID da recompensa é obrigatório');
            }
            

            let response = await RewardModel.deleteRewardById(id);
            Log.addLog({
                origem: 'Reward',
                action: 'delete',
                idReference: response.id,
                idProfile: authenticatedId
            })
            return response
        } catch (error) {
            throw new Error(`Erro ao excluir recompensa: ${error.message}`);
        }
    }
}
