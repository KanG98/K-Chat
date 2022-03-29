const Sequelize = require('sequelize')
const db = require('./db')

const Messages = db.define("messages", {
  messageId: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  senderId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  roomId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sentTime: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  }

})

module.exports = Messages