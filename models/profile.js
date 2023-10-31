const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = class Profile {

    static async getProfilesByUserId(id){
        return await prisma.profile.findMany({
            where: {
                idUser: parseInt(id),
                deleted: false,
                status: 'ACTIVE'
            }
        });
    }

    static async getProfileById(id){
        return await prisma.profile.findUnique(id)
    }

    static async insertNewProfile(data){
        return await prisma.profile.create({
            data: {
                idUser: parseInt(data.idUser),
                name: data.name,
                birthDate: data.birthDate,
                type: data.type
            }
        })
    }

    static async updateProfile(data){
        return await prisma.profile.update({
            where: {
                id: parseInt(data.id),
            },
            data: {
                name: data.name,
                birthDate: data.birthDate,
                status: data.status,
                type: data.type
            }
        })
    }

    static async deleteProfileById(id){
        return await prisma.profile.update({
            where: {
                id: parseInt(id)
            },
            data: {
                status: 'DISABLE',
                deleted: true
            }
        })
    }
}