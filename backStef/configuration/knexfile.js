
module.exports = {

  staging: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  },

  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }

}
