const LogsController = require('./log') 
const UsersControlle = require('./user') 

module.exports = class DashboardController {

    static async getDashboardData(){
        let LogCount = await LogsController.getCountLogs()
        let allUsersCount = await UsersControlle.getCountAllUsers()
        let lastUsersCount = await UsersControlle.getCountLastUsers()
        let lastUsers = await UsersControlle.getLastUsers()

        return{ 
            actions: LogCount,
            allUsersCount: allUsersCount,
            lastUsersCount: lastUsersCount,
            lastUsers: lastUsers,
            
        }
    }

    
}

    
