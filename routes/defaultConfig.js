const fs = require('fs');
module.exports = function(api){

    api.get('/config', async function (request, response){
        const config = fs.readFileSync('config/config.json').toString();
        response.json(JSON.parse(config));
    })
}