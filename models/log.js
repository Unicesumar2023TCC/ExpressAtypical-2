const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = class Log {

    static async getAllLogs(){
        const logs = await prisma.log.findMany();
        
        // Converter a data e hora para o formato pt-BR com "às" no lugar da vírgula
        const logsPtBR = logs.map(log => {
            const formattedTime = new Date(log.time).toLocaleString('pt-BR');
            const formattedTimePtBR = formattedTime.replace(',', ' às');
            
            return {
                ...log,
                time: formattedTimePtBR
            };
        });
    
        return logsPtBR;
    }

    static async addLog(data){
        return await prisma.log.create({
            data: {
                origem: data.origem,
                action: data.action,
                idReference: data.idReference,
                time: new Date(),
                idUser: data.idUser 
            }
        });
    }

}
