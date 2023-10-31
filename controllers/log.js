
const LogModel = require('../models/log');

module.exports = class Logs {

    static async getLogs(){
        try {
            return await LogModel.getAllLogs();
        } catch (error) {
            throw new Error(`Erro ao buscar logs: ${error.message}`);
        }
    }

    static async getCountLogs(){
        try {
            return await LogModel.countLogs();
        } catch (error) {
            console.log(error)
            throw new Error(`Erro ao buscar logs: ${error.message}`);
        }
    }

}

    
