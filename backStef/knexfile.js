
module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    ssl: true
  }

}
