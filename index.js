const express = require('express');
const bodyparser =  require('body-parser');
const cors = require('cors');
const consign = require('consign')
const api = express();
const porta = 3000;
const router = express.Router();


api.use(cors());
api.use(bodyparser.urlencoded({extended: true}))

// faz que o consign pegue tudo que está dentro da pasta controllers e jogue para dentro app
consign()
    .include('routes')
    .into(api)

api.listen(porta);
console.log('API RUN EXPRESS');
