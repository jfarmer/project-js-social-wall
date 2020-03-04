require('dotenv').config();

module.exports = {
  development: {
    url: 'postgres://localhost:5432/social_wall_development',
  },
  test: {
    url: 'postgres://localhost:5432/social_wall_test',
  },
  production: {
    url: process.env.DATABASE_URL,
  },
}
