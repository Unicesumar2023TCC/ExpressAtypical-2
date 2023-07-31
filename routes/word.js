const multer = require('multer');
const upload = multer();

module.exports = function(api){

    const WordController = require('../controllers/word');

    api.get('/word/:id?', async function (request, response){
        const word = await WordController.getWordsByCategoryId(request.params.id);
        response.json(word);
    })

    //add new word
    api.post('/word', upload.none(), async function(request, response){
        data = await WordController.insertNewWord(request.body);
        response.json(data);
    });

    //edit word
    api.put('/word', upload.none(), async function(request, response){
        data = await WordController.updateWordById(request.body);
        response.json(data);
    });

    //delete word
    api.delete('/word/:id?', upload.none(), async function(request, response){
        data = await WordController.deleteWordById(request.params.id);
        response.json(data);
    });
}