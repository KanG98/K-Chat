const Sequelize = require('sequelize')
const path = require('path')

require('dotenv').config({ 
    path: path.resolve(__dirname, '../.env') 
 })

const db = new Sequelize(
    {
        dialect: process.env.DIALECT,
        host: process.env.HOST,
        port: process.env.DBPORT,
        username: process.env.USERNAME,
        password:process.env.PASSWORD,
        database: process.env.DATABASE
    }
)

module.exports = db
