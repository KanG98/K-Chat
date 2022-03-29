const Sequelize = require('sequelize')

const db = new Sequelize(
    {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'kylexue',
        password:'yankang198',
        database: 'kchat'
    }
)

module.exports = db