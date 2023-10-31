const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = class GameHistory {

    static async getGameHistoriesByProfileId(id){
        return await prisma.GameHistory.findMany({
            where: {
                idProfile: parseInt(id),
                deleted: false,
            }
        });
    }

    static async insertNewGameHistory(data){
        data.date = new Date(data.date);
        return await prisma.GameHistory.create({
            data: {
                idProfile: parseInt(data.idProfile),
                level: data.level,
                score: data.score,
                date: data.date,
            }
        })
    }

    static async updateGameHistory(data){
        data.date = new Date(data.date);
        return await prisma.GameHistory.update({
            where: {
                id: parseInt(data.id),
            },
            data: {
                level: data.level,
                score: data.score,
                date: data.date,
            }
        })
    }

    static async deleteGameHistoryById(id){
        return await prisma.GameHistory.update({
            where: {
                id: parseInt(id)
            },
            data: {
                deleted: true
            }
        })
    }
}