const { Sequelize, DataTypes } = require('sequelize');

const storage = process.env.DB_PATH || 'db.sqlite3';
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage,
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Must be a valid email address',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

exports.User = User;

exports.connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');
    await sequelize.sync();
    console.log('Tables are now available');
  } catch (err) {
    console.error(err);
  }
};

exports.disconnectDB = async () =>{
  await sequelize.close();
}