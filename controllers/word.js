const WordModel = require('../models/word');

module.exports = class Word {

    static async getWordsByCategoryId(id){
        return await WordModel.getWordsByCategoryId(id)
    }

    static async insertNewWord(data){
        if((data.name).length > 0){
            if(await this.checkIfWordExist(data) === false){
                return await WordModel.insertNewWord(data)
            }
        }
        return false
        
    }

    static async checkIfWordExist(data){
        return Boolean((await WordModel.getWordByNameAndCategory(data)).length)
    }

    static async updateWordById(data){
        return await WordModel.updateWordById(data)
    }

    static async deleteWordById(id){
        return await WordModel.deleteWordById(id)
    }
}