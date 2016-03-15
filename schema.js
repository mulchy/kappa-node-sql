var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/node-app';

var client = new pg.Client(connectionString);
client.connect();

var query = client.query('CREATE TABLE IF NOT EXISTS people ('+
         'id SERIAL NOT NULL, ' +
         'name character varying(80) NOT NULL, ' +
         'address text NOT NULL);');

query.on('error', function(error) {
  console.log('Error creating schema!', error);
});
query.on('end', function() { client.end(); });
