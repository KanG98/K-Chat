const Sequelize = require('sequelize')
const db = require('./db')

const Users = db.define("users", {
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  emailIsVerified: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  regisTime: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }
})

module.exports = Users