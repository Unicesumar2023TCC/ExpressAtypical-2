const multer = require('multer');
const upload = multer();

module.exports = function(api){

    const CategoryController = require('../controllers/category');

    api.get('/category/:id?', async function (request, response){
        const category = await CategoryController.getCategoriesByUserId(request.params.id);
        response.json(category);
    })

    //add new category
    api.post('/category', upload.none(), async function(request, response){
        data = await CategoryController.insertNewCategory(request.body);
        response.json(data);
    });

    //edit category
    api.put('/category', upload.none(), async function(request, response){
        data = await CategoryController.updateCategory(request.body);
        response.json(data);
    });

    //delete category
    api.delete('/category/:id?', upload.none(), async function(request, response){
        data = await CategoryController.deleteCategoryById(request.params.id);
        response.json(data);
    });
}