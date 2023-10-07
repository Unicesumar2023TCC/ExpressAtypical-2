const WordModel = require('../models/word');

module.exports = class Word {

    static async getWordsByCategoryId(id){
        try {
            return await WordModel.getWordsByCategoryId(id);
        } catch (error) {
            throw new Error(`Erro ao buscar palavras por categoria: ${error.message}`);
        }
    }

    static async insertNewWord(data){
        try {
            if (!data.name) {
                throw new Error('Nome da palavra é obrigatório');
            }

           if(await this.checkIfWordExist(data)){
                throw new Error('Palavra já existe para esta categoria');
            }
    
            return await WordModel.insertNewWord(data);
        } catch (error) {
            throw new Error(`Erro ao inserir nova palavra: ${error.message}`);
        }
    }

    static async checkIfWordExist(data){
        return Boolean((await WordModel.getWordByNameAndCategory(data)).length)
    }

    static async updateWordById(data){
        try {
            return await WordModel.updateWordById(data);
        } catch (error) {
            throw new Error(`Erro ao atualizar palavra: ${error.message}`);
        }
    }

    static async deleteWordById(id){
        try {
            return await WordModel.deleteWordById(id);
        } catch (error) {
            throw new Error(`Erro ao excluir palavra: ${error.message}`);
        }
    }
}

    
