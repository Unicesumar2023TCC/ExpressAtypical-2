const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = class FilesController {

    static async saveImageBase64(image){
        let base64Image = image.split(';base64,').pop();
        let imagePath = 'assets/img/' + uuidv4() + '.png';
        fs.writeFile(imagePath, base64Image, {encoding: 'base64'}, function(err) {
            console.log('File created');
        });
        return imagePath
    }

    static async saveAudioBase64(audio){
        let base64audio = audio.split(';base64,').pop();
        let audioPath = 'assets/audio/' + uuidv4() + '.mp3';
        fs.writeFile(audioPath, base64audio, {encoding: 'base64'}, function(err) {
            console.log('File created');
        });
        return audioPath
    }

    static fileToBase64(filePath) {
        try {
            const fileData = fs.readFileSync(filePath);
            const base64Data = fileData.toString('base64');
            return base64Data;
        } catch (error) {
            console.error('Erro ao ler o arquivo:', error);
            return null;
        }
    }
}

    
