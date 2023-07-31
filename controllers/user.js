const UsersModel = require('../models/user');

module.exports = class User {

    static async getAllUsers(){
        return await UsersModel.getAllUsers();
    }

    static async getAllActiveUsers(){
        return await UsersModel.ggetAllActiveUsers();
    }

    static async getUserById(id){
        return await UsersModel.getUserById(id);
    }

    static async insertNewUser(data){
        if((data.name).length > 0 && (data.email).length > 0 && (data.password).length > 0 && (data.phone).length > 0 && (data.birthdate)){
            if(await this.checkIfEmailExist(data.email) === false){
                return await UsersModel.insertNewUser(data);
            }
        }
        
        return false;
        
    }

    static async checkIfEmailExist(email){
        return Boolean((await UsersModel.getActiveUserByEmail(email)).length)
    }

    static async updateUser(data){
        return await UsersModel.updateUser(data);
    }

    static async deleteUserById(id){
        return await UsersModel.deleteUserById(id);
    }

    static async checkUserLogin(email){
        return await UsersModel.checkUserLogin(email);
    }
}