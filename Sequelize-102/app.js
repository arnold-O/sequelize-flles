const express = require("express");
const Sequelize = require("sequelize");


const app = express();
app.use(express.json());

const sequelize = new Sequelize("sql_class_jwt", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define('user',{
  id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  },
  name:{
    type:Sequelize.STRING(50),
    allowNull:false,

  }
  ,
  email:{
    type:Sequelize.STRING(50),
    allowNull:false,

  },
  password:{
    type:Sequelize.STRING(150),
    allowNull:false
  },
  status:{
    type:Sequelize.INTEGER,
    defaultValue:1

  },
  
},  {
  modelNAme: "User",
})

sequelize.sync()

// check DB connection
sequelize
  .authenticate()
  .then(function (res) {
    console.log(`we have connected successfully`);
  })
  .catch(function (err) {
    console.log(err);
  });

// routes handler


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`app listeining on port ${PORT}`);
});
