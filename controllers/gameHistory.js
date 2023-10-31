const GameHistoryModel = require('../models/gameHistory');
const UserController = require('./user') 
const Log = require('../models/log');

module.exports = class GameHistory {

    static async getGameHistoriesByUserId(id, authenticatedId){
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }

            if (!id) {
                throw new Error('ID do usuário é obrigatório');
            }
            
            const authenticatedUser = await UserController.getUserById(authenticatedId)

            if(authenticatedUser.id != authenticatedId && authenticatedUser.type != 'Admin'){
                throw new Error('Usuário não autorizado')
            }

            return await GameHistoryModel.getGameHistoriesByProfileId(id);
            
        } catch (error) {
            throw new Error(`Erro ao buscar perfis: ${error.message}`);
        }
    }

    static async insertNewGameHistory(data, authenticatedId){
        if (!data.level) {
            throw new Error('Nível vazio');
        }

        if (!data.score) {
            throw new Error('Pontuação vazia');
        }

        if (!data.date) {
            throw new Error('Data vazia');
        }

        if (!data.idProfile) {
            throw new Error('Perfil inválido');
        }


        try {
            let response = await GameHistoryModel.insertNewGameHistory(data);
            
            Log.addLog({
                origem: 'GameHistory',
                action: 'create',
                idReference: response.id,
                idUser: authenticatedId
            })
            return response
        } catch (error) {
            throw new Error(`Erro ao inserir novo histórico de jogo: ${error.message}`);
        }
    }

    static async updateGameHistory(data, authenticatedId){
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }

            let response = await GameHistoryModel.updateGameHistory(data);
            Log.addLog({
                origem: 'GameHistory',
                action: 'update',
                idReference: response.id,
                idUser: authenticatedId
            })
            return response
        } catch (error) {
            throw new Error(`Erro ao atualizar histórico de jogo: ${error.message}`);
        }
    }

    static async deleteGameHistoryById(id, authenticatedId){
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }

            if (!id) {
                throw new Error('ID da histórico de jogo é obrigatório');
            }
            

            let response = await GameHistoryModel.deleteGameHistoryById(id);
            Log.addLog({
                origem: 'GameHistory',
                action: 'delete',
                idReference: response.id,
                idUser: authenticatedId
            })
            return response
        } catch (error) {
            throw new Error(`Erro ao excluir histórico de jogo: ${error.message}`);
        }
    }
}
