const multer = require('multer');
const upload = multer();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = function(api){

    const UserController = require('../controllers/user');

    api.get('/user', async function (request, response){
        const user = await UserController.getAllUsers();
        response.json(user);
    })

    api.get('/user/:id?', async function (request, response){
        const user = await UserController.getUserById(request.params.id);
        response.json(user);
    })

    //add new user
    api.post('/user', upload.none(), async function(request, response){
        request.body.birthDate = new Date(request.body.birthDate);
        request.body.password = bcrypt.hashSync(request.body.password, 10);
        data = await UserController.insertNewUser(request.body);
        response.json(data);
    });

    //edit user
    api.put('/user', upload.none(), async function(request, response){
        request.body.birthDate = new Date(request.body.birthDate);
        request.body.password = bcrypt.hashSync(request.body.password, 10);
        data = await UserController.updateUser(request.body);
        response.json(data);
    });

    //delete user
    api.delete('/user/:id?', upload.none(), async function(request, response){
        data = await UserController.deleteUserById(request.params.id);
        response.json(data);
    });

    //login user
    api.post('/login', upload.none(), async function(request, response){
        data = await UserController.checkUserLogin(request.body.email);
        if(data.length > 0){
            /* response.json(request.body.password); */
            bcrypt.compare(request.body.password, data[0].password, function(err, result) {
                if(result){
                    token = jwt.sign(data[0], "MySecretKey", {expiresIn: '01m'});
                    response.json({token: token});
                }else{
                    response.json('login incorreto');
                }
                if(err){
                    response.json('n deu boa');
                }
            });
        }else{
            response.json('login incorreto');
        }
    });
}