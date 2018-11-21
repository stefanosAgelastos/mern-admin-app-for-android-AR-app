
module.exports = {

  staging: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    ssl: true
  },

  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    ssl: true
  }

}
