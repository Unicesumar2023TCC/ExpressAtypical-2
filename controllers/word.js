const WordModel = require('../models/word');
const UserController = require('./user') 
const CategoryController = require('./category') 
const FilesController = require('./files');
const Log = require('../models/log');


module.exports = class Word {

    static async getWordsByCategoryId(idCategory, authenticatedId){
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }

            if (!idCategory) {
                throw new Error('ID do usuário é obrigatório');
            }
            
            const authenticatedUser = await UserController.getUserById(authenticatedId)
            const category = await CategoryController.getcategorieById(idCategory)

            if(authenticatedUser.id != category.idUser && authenticatedUser.type != 'Admin'){
                throw new Error('Usuário não autorizado')
            }

            let words = await WordModel.getWordsByCategoryId(idCategory);

           
            words.forEach(async (word) => {
                if(word.imageUrl){
                    word.base64image = FilesController.fileToBase64(word.imageUrl);
                }

                if(word.voiceUrl){
                    word.base64audio = await FilesController.fileToBase64(word.voiceUrl);
                }
            });

            return words
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
    
            data.imagePath = null;
            if (data.image) {
                data.imageUrl = await FilesController.saveImageBase64(data.image)
            }
    
            data.audioPath = null;
            if (data.audio) {
                data.voiceUrl = await FilesController.saveAudioBase64(data.audio)
            }
    
            let response = await WordModel.insertNewWord(data);
    
            Log.addLog({
                origem: 'Word',
                action: 'create',
                idReference: response.id,
                idUser: data.idUser
            });
    
            return response;
        } catch (error) {
            throw new Error(`Erro ao inserir nova palavra: ${error.message}`);
        }
    }
    

    static async checkIfWordExist(data){
        return Boolean((await WordModel.getWordByNameAndCategory(data)).length)
    }

    static async updateWordById(data, authenticatedId){
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }
          
            const authenticatedUser = await UserController.getUserById(authenticatedId)
            const category = await CategoryController.getcategorieById(data.id);

            if(authenticatedUser.id != category.idUser && authenticatedUser.type != 'Admin'){
                throw new Error('Usuário não autorizado')
            }

            data.imagePath = null;
            if (data.image) {
                data.imageUrl = await FilesController.saveImageBase64(data.image)
            }
    
            data.audioPath = null;
            if (data.audio) {
                data.voiceUrl = await FilesController.saveAudioBase64(data.audio)
            }

            let response = await WordModel.updateWordById(data);

            Log.addLog({
                origem: 'Word',
                action: 'update',
                idReference: response.id,
                idUser: authenticatedId
            })
            return response
        } catch (error) {
            throw new Error(`Erro ao atualizar palavra: ${error.message}`);
        }
    }

    static async deleteWordById(id, authenticatedId){
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }

            if (!id) {
                throw new Error('ID do usuário é obrigatório');
            }
            
            const authenticatedUser = await UserController.getUserById(authenticatedId)
            const word = await WordModel.getWordById(id)
            const category = await CategoryController.getcategorieById(word.idCategory)

            if(authenticatedUser.id != category.idUser && authenticatedUser.type != 'Admin'){
                throw new Error('Usuário não autorizado')
            }

            let response = await WordModel.deleteWordById(id);
            Log.addLog({
                origem: 'Word',
                action: 'delete',
                idReference: response.id,
                idUser: authenticatedId
            })
            return response
        } catch (error) {
            throw new Error(`Erro ao excluir palavra: ${error.message}`);
        }
    }
}

    
