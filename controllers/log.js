
const LogModel = require('../models/log');

module.exports = class Word {

    static async getLogs(){
        try {
            return await LogModel.getAllLogs();
        } catch (error) {
            throw new Error(`Erro ao buscar logs: ${error.message}`);
        }
    }

}

    
