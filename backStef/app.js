var pg = require("pg");

var client = new pg.Client({
  user: "gqggjeeqcboafh",
  password: "4bf1cfbec97e2f892a47c41e8f572ce913a826880ebf23583c7ba45aad65262f",
  database: "d92p0m3e68fok9",
  port: 5432,
  host: "ec2-54-217-216-149.eu-west-1.compute.amazonaws.com",
  ssl: true
});

client.connect();

var query = client.query('CREATE TABLE people(id SERIAL PRIMARY KEY, name VARCHAR(100) not null)');

query.on('row', function(row) {
  console.log(row.name);
});

query.on('end', client.end.bind(client));