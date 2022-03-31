const Sequelize = require('sequelize')
const db = require('./db')

const JoinRoom = db.define("joinRoom", {
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  roomId: {    
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  joinTime: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }
})

module.exports = JoinRoom