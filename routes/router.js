const multer = require('multer');
const upload = multer();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = function(api){

    const UserController = require('../controllers/user');
    const WordController = require('../controllers/word');
    const ProfileController = require('../controllers/profile');
    const CategoryController = require('../controllers/category');
    const LogController = require('../controllers/log');

    const verifyToken = require('../middlewares/auth');

    //get initial config for categories and words
    api.get('/config', async function (request, response){
        const config = fs.readFileSync('config/config.json').toString();
        response.json(JSON.parse(config));
    })
      
    
    //add new user
    api.post('/user', upload.none(), async function(request, response){
        try {
            request.body.birthDate = new Date(request.body.birthDate);
            request.body.password = bcrypt.hashSync(request.body.password, 10);
            const data = await UserController.insertNewUser(request.body);
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });
    
    //login user
    api.post('/login', async function(request, response) {
        try {

            const data = await UserController.checkUserLogin(request.body.email);
            
            if (data.length > 0) {
                bcrypt.compare(request.body.password, data[0].password, function(err, result) {
                    if (result) {
                        const token = jwt.sign(data[0], "MySecretKey", { expiresIn: '7d' });
                        
                        // Adicione o token ao cookie
                        response.cookie('jwt', token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true }); // MaxAge define a validade em milissegundos
    
                        response.json({ token: token });
                    } else {
                        response.json('login incorreto');
                    }
                });
            } else {
                response.json('login incorreto');
            }
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });
    
    // Middleware para proteger rotas seguintes
    api.use(verifyToken)

    api.post('/logout', function(request, response) {
        try {
          // Remova o cookie 'jwt'
          response.clearCookie('jwt', { httpOnly: true });
      
          response.json({ message: 'Logout realizado com sucesso' });
        } catch (error) {
          response.status(500).json({ error: error.message });
        }
      });

    //get authenticated user
    api.get('/user', async function (request, response){
        try {
            const user = await UserController.getUserById(request.authId);
            response.json(user);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });

    //get all users
    api.get('/user/all', async function (request, response){
        try {
            const user = await UserController.getAllActiveUsers(request.authId);
            response.json(user);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });

    //get one user
    api.get('/user/:id?', async function (request, response){
        try {
            const user = await UserController.getUser(request.params.id, request.authId);
            response.json(user);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });

    //edit user
    api.put('/user', upload.none(), async function(request, response){
        try {
            request.body.birthDate = new Date(request.body.birthDate);
            request.body.password = bcrypt.hashSync(request.body.password, 10);
            const data = await UserController.updateUser(request.body, request.authId);
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });

    //delete user
    api.delete('/user/:id?', upload.none(), async function(request, response){ 
        try {
            const data = await UserController.deleteUserById(request.params.id, request.authId);
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });



    //get category
    api.get('/category/:id?', async function (request, response){
        try {
            const category = await CategoryController.getCategoriesByUserId(request.params.id, request.authId);
            response.json(category);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });

    //add new category
    api.post('/category', upload.none(), async function(request, response){
        try {
            request.body.idUser = request.authId;
            const data = await CategoryController.insertNewCategory(request.body);
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });

    //edit category
    api.put('/category', upload.none(), async function(request, response){
        try {
            const data = await CategoryController.updateCategory(request.body, request.authId);
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });

    //delete category
    api.delete('/category/:id?', upload.none(), async function(request, response){
        try {
            const data = await CategoryController.deleteCategoryById(request.params.id, request.authId);
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });



    //GET PROFILE
    api.get('/profile/:id?', async function (request, response){
        try {
            const profile = await ProfileController.getProfilesByUserId(request.params.id, request.authId);
            response.json(profile);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    })

    //add new profile
    api.post('/profile', upload.none(), async function(request, response){
        try {
            request.body.birthDate = new Date(request.body.birthDate);
            request.body.idUser = request.authId;
            const data = await ProfileController.insertNewProfile(request.body);
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });

    //edit profile
    api.put('/profile', upload.none(), async function(request, response){
        try {
            request.body.birthDate = new Date(request.body.birthDate);
            const data = await ProfileController.updateProfile(request.body, request.authId);
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });

    //delete profile
    api.delete('/profile/:id?', upload.none(), async function(request, response){
        try {
            const data = await ProfileController.deleteProfileById(request.params.id, request.authId);
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });



    //get word
    api.get('/word/:id?', async function (request, response){
        try {
            const word = await WordController.getWordsByCategoryId(request.params.id, request.authId);
            response.json(word);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    })

    //add new word
    api.post('/word', upload.none(), async function(request, response){
        try {
            request.body.idUser = request.authId;
            const data = await WordController.insertNewWord(request.body);
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });

    //edit word
    api.put('/word', upload.none(), async function(request, response){
        try {
            const data = await WordController.updateWordById(request.body, request.authId);
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });

    //delete word
    api.delete('/word/:id?', upload.none(), async function(request, response){
        try {
            const data = await WordController.deleteWordById(request.params.id, request.authId);
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });
    

    //get logs
    api.get('/logs', async function (request, response){
        try {
            const log = await LogController.getLogs();
            response.json(log);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    })
}
