const Sequelize = require('sequelize')
const db = require('./db')

const Rooms = db.define("rooms", {
  roomId: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  roomName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdTime: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  hostUserId: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

module.exports = Rooms