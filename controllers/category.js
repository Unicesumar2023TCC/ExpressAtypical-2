const CategoryModel = require('../models/category');

module.exports = class Category {

    static async getCategoriesByUserId(id){
        return await CategoryModel.getCategoriesByUserId(id);
    }

    static async insertNewCategory(data){
        if((data.name).length > 0){
            if(await this.checkIfCategoryExist(data) === false){
                return await CategoryModel.insertNewCategory(data)
            }
        }
            
        return false;
    }

    static async checkIfCategoryExist(data){
        return Boolean((await CategoryModel.getCategoryByNameAndUser(data)).length)
    }

    static async updateCategory(data){
        return await CategoryModel.updateCategory(data)
    }

    static async deleteCategoryById(id){
        return await CategoryModel.deleteCategoryById(id)
    }
}