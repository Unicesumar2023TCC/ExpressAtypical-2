const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = class User {

    static async getAllUsers(){
        let users = await prisma.user.findMany({
            where: {
                deleted: false
            },
            select: {
                password: false,
            }
        });
    
        users = users.map(user => {
            const formattedTime = new Date(user.birthDate).toLocaleString('pt-BR');
            const formattedTimePtBR = formattedTime.replace(',', ' às');
            
            return {
                ...user,
                birthDate: formattedTimePtBR
            };
        });
    
        return users;
    }

    static async getAllActiveUsers(){
        const users = await prisma.user.findMany({
            where: {
                deleted: false,
                status: 'ACTIVE',
            },
            select: {
                id: true, 
                name: true,
                email: true,
                birthDate: true,
                phone: true,
                status: true,
                type: true,
                createdAt: true,
                updatedAt: true,
                deleted: true,
            }
        });

        const usersFormated = users.map(user => {
            const formattedDate = new Date(user.birthDate).toLocaleDateString('pt-BR');
            return {
                ...user,
                birthDate: formattedDate
            };
        });
        
        return usersFormated;
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
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                id: true, 
                name: true,
                email: true,
                birthDate: true,
                phone: true,
                status: true,
                type: true,
                createdAt: true,
                updatedAt: true,
                deleted: true,
            }
        });
        
        user.birthDate = new Date(user.birthDate).toISOString().split('T')[0];
        return user;
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

    static async updateUser(data) {
        const { id, ...updateData } = data;
    
        return await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: updateData,
        });
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

    static async countAllUsers() {
        const count = await prisma.user.count();
        return count;
    }

    static async countLastUsers() {
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14); // Subtrai 14 dias
    
        const count = await prisma.user.count({
            where: {
                createdAt: {
                    gte: twoWeeksAgo // "gte" significa "greater than or equal to" (maior ou igual a)
                }
            }
        });
    
        return count;
    }

    static async getLastUsers() {
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14); // Subtrai 14 dias
    
        const count = await prisma.user.findMany({
            where: {
                createdAt: {
                    gte: twoWeeksAgo // "gte" significa "greater than or equal to" (maior ou igual a)
                }
            },
            select: {
                email: true,
                name: true,
                createdAt: true
            }
        });
    
        return count;
    }
}