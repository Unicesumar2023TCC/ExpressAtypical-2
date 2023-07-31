const multer = require('multer');
const upload = multer();

module.exports = function(api){

    const ProfileModel = require('../models/profile');

    api.get('/profile/:id?', async function (request, response){
        const profile = await ProfileModel.getProfilesByUserId(request.params.id);
        response.json(profile);
    })

    //add new profile
    api.post('/profile', upload.none(), async function(request, response){
        request.body.birthDate = new Date(request.body.birthDate);
        data = await ProfileModel.insertNewProfile(request.body);
        response.json(data);
    });

    //edit profile
    api.put('/profile', upload.none(), async function(request, response){
        request.body.birthDate = new Date(request.body.birthDate);
        data = await ProfileModel.updateProfile(request.body);
        response.json(data);
    });

    //delete profile
    api.delete('/profile/:id?', upload.none(), async function(request, response){
        data = await ProfileModel.deleteProfileById(request.params.id);
        response.json(data);
    });
}