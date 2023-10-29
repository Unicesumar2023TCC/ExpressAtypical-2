const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = class Word {

    static async getWordsByCategoryId(id){
        return await prisma.word.findMany({
            where: {
                idCategory: parseInt(id),
                deleted: false,
                status: 'ACTIVE'
            }
        });
    }

    static async getWordById(id){
        return await prisma.word.findUnique({
            where: {
                id: parseInt(id),
            }
        });
    }

    static async insertNewWord(data){
        return await prisma.word.create({
            data: {
                idCategory: parseInt(data.idCategory),
                name: data.name,
                imageUrl: data.imageUrl,
                voiceUrl: data.voiceUrl
            }
        })
    }

    static async getWordByNameAndCategory(data){
        return await prisma.word.findMany({
            where: {
                idCategory: parseInt(data.idCategory),
                name: data.name,
                deleted: false,
                status: 'ACTIVE'
            }
        });
    }

    static async updateWordById(data){
        return await prisma.word.update({
            where: {
                id: parseInt(data.id),
            },
            data: {
                name: data.name,
                status: data.status,
                imageUrl: data.imageUrl,
                voiceUrl: data.voiceUrl
            }
        })
    }

    static async deleteWordById(id){
        return await prisma.word.update({
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