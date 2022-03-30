const Sequelize = require('sequelize')
const db = require('./db')
const Users = require('./users')

const UserLogin = db.define("userLogin", {
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      // This is a reference to another model
      model: Users,

      // This is the column name of the referenced model
      key: 'userId'
  }
  },
  deviceId: {    
    // this should be uuid and be stored in localStorage
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  lastLoginTime: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }
})


module.exports = UserLogin