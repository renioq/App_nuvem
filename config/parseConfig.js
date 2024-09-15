const Parse = require('parse/node');

require('dotenv').config(); // Carrega variáveis de ambiente

// Configuração do Parse Server com Back4App
Parse.initialize(process.env.APP_ID, process.env.JAVASCRIPT_KEY, process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;

module.exports = Parse;