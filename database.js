const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_NAME || 'db.sqlite3',
});

exports.User = sequelize.define('User', {
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
  },
});

exports.connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');
    await sequelize.sync({ force: true });
    console.log('Tables are now available');
  } catch (err) {
    console.error(err);
  }
};

exports.disconnectDB = async () => {
  await sequelize.close();
};
