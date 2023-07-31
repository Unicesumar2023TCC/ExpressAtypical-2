const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = class User {

    static async getAllUsers(){
        return await prisma.user.findMany({
            where: {
                deleted: false
            }
        });
    }

    static async getAllActiveUsers(){
        return await prisma.user.findMany({
            where: {
                deleted: false,
                status: 'ACTIVE',
            }
        });
    }

    static async getActiveUserByEmail(email){
        return await prisma.user.findMany({
            where: {
                email: email,
                deleted: false
            }
        });
    }

    static async getUserById(id){
        return await prisma.user.findMany({
            where: {
                id: parseInt(id),
            },
        });
    }

    static async insertNewUser(data){
        return await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
                birthDate: data.birthDate,
            }
        })
    }

    static async updateUser(data){
        return await prisma.user.update({
            where: {
                id: parseInt(data.id),
            },
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
                birthDate: data.birthDate,
                status: data.status,
            }
        })
    }

    static async deleteUserById(id){
        return await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                status: 'DISABLE',
                deleted: true
            }
        })
    }

    static async checkUserLogin(email){
        return await prisma.user.findMany({
            where: {
                email: email
            }
        });
    }
}