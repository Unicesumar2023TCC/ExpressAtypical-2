const ProfileModel = require('../models/profile');

module.exports = class Profile {

    static async getProfilesByUserId(id){
        return await ProfileModel.getProfilesByUserId(id)
    }

    static async insertNewProfile(data){
        if((data.name).length > 0 && (data.idUser) && (data.birthdate)){
            return await ProfileModel.insertNewProfile(data)
        }
        return false
        
    }

    static async updateProfile(data){
        return await ProfileModel.updateProfile(data)
    }

    static async deleteProfileById(id){
        return await ProfileModel.deleteProfileById(id)
    }
}