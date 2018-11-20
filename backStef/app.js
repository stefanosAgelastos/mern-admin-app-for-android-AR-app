/* CUstom class, for getting the credentials, it makes sure that it returns credentials that can get a connection */
const connector = require('./databaseConnection');

const Knex = require("knex");


const credentials = connector.getWorkingURI();
console.log(credentials);