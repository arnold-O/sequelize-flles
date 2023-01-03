const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('sequelize_docs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });



//  const dbConnection = async()=>{
 (async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    
 })()

 

//   model 
  const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
  });



 
