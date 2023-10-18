const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const consign = require('consign');
const cookieParser = require('cookie-parser');

const api = express();
const porta = 3002;

api.use(cors({ origin: '*', credentials: true }));
api.use(bodyparser.json());
api.use(bodyparser.urlencoded({ extended: true }));
api.use(cookieParser());
// faz com que o consign pegue tudo que está dentro da pasta controllers e jogue dentro do app
consign()
    .include('routes')
    .into(api);

api.listen(porta, () => {
    console.log(`API RUN EXPRESS PORTA: ${porta}`);
});
