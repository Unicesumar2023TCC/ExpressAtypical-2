const multer = require('multer');
const upload = multer();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const base64Img = require('base64-img');

function getBase64FromImage(imgPath) {
    return new Promise((resolve, reject) => {
        base64Img.base64(imgPath, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

module.exports = function(api){
    
    const DashboardController = require('../controllers/dashboard');
    const UserController = require('../controllers/user');
    const WordController = require('../controllers/word');
    const ProfileController = require('../controllers/profile');
    const CategoryController = require('../controllers/category');
    const LogController = require('../controllers/log');
    const RewardController = require('../controllers/reward');
    const GameHistoryController = require('../controllers/gameHistory');

    const verifyToken = require('../middlewares/auth');

    //get initial config for categories and words
    api.get('/config', async function (request, response){
        const config = fs.readFileSync('config/config.json').toString();
        const configJson = JSON.parse(config);
    
        // Iterar sobre as categorias e palavras
        for (const categoria of configJson.categorias) {
            for (const palavra of categoria.Palavras) {
                const imgPath = path.join(__dirname, '..', palavra.img);
                try {
                    const base64Data = await getBase64FromImage(imgPath);
                    palavra.imgBase64 = base64Data;
                } catch (err) {
                    console.error(`Erro ao obter base64 para ${palavra.nome}:`, err);
                }
            }
        }
    
        response.json(configJson);
    });
      
    
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
    api.post('/login', upload.none(), async function(request, response) {
        try {

            const data = await UserController.checkUserLogin(request.body.email);
            
            if (data.length > 0) {
                bcrypt.compare(request.body.password, data[0].password, function(err, result) {
                    if (result) {
                        const token = jwt.sign(data[0], "MySecretKey", { expiresIn: '7d' });
                        
                        // Adicione o token ao cookie
                        response.cookie('jwt', token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: false }); // MaxAge define a validade em milissegundos
    
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
            response.status(401).json({ error: error.message });
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

            if(request.body.password){
                request.body.password = bcrypt.hashSync(request.body.password, 10);
            }
            
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
    


    //get reward
    api.get('/reward/:id?', async function (request, response){
        try {
            const reward = await RewardController.getRewardsByUserId(request.params.id, request.authId);
            response.json(reward);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    })

    //add new reward
    api.post('/reward', upload.none(), async function(request, response){
        try {
            request.body.idUser = request.authId;
            const data = await RewardController.insertNewReward(request.body);
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });

    //edit reward
    api.put('/reward', upload.none(), async function(request, response){
        try {
            const data = await RewardController.updateReward(request.body, request.authId);
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });

    //delete reward
    api.delete('/reward/:id?', upload.none(), async function(request, response){
        try {
            const data = await RewardController.deleteRewardById(request.params.id, request.authId);
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });
    


    //get gameHistory
    api.get('/gameHistory/:id?', async function (request, response){
        try {
            const gameHistory = await GameHistoryController.getGameHistoriesByUserId(request.params.id, request.authId);
            response.json(gameHistory);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    })

    //add new gameHistory
    api.post('/gameHistory', upload.none(), async function(request, response){
        try {
            request.body.idUser = request.authId;
            const data = await GameHistoryController.insertNewGameHistory(request.body, request.authId);
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });

    //edit gameHistory
    api.put('/gameHistory', upload.none(), async function(request, response){
        try {
            const data = await GameHistoryController.updateGameHistory(request.body, request.authId);
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });

    //delete gameHistory
    api.delete('/gameHistory/:id?', upload.none(), async function(request, response){
        try {
            const data = await GameHistoryController.deleteGameHistoryById(request.params.id, request.authId);
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



     //get dashboard
     api.get('/dashboard', async function (request, response){
        try {
            const data = await DashboardController.getDashboardData();
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    })
}
