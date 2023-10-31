const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = class Reward {

    static async getRewardsByProfileId(id){
        return await prisma.reward.findMany({
            where: {
                idProfile: parseInt(id),
                deleted: false,
                status: 'ACTIVE'
            }
        });
    }

    static async insertNewReward(data){
        data.dateEnd = new Date(data.dateEnd);
        return await prisma.reward.create({
            data: {
                idProfile: parseInt(data.idProfile),
                reward: data.reward,
                dateEnd: data.dateEnd,
            }
        })
    }

    static async updateReward(data){
        data.dateEnd = new Date(data.dateEnd);
        return await prisma.reward.update({
            where: {
                id: parseInt(data.id),
            },
            data: {
                name: data.name,
                reward: data.reward,
                dateEnd: data.dateEnd,
            }
        })
    }

    static async deleteRewardById(id){
        return await prisma.reward.update({
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