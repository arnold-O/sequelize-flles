const express = require("express");
const Sequelize = require("sequelize");


const router = express.Router();



const sequelize = new Sequelize("sql_class", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// check DB connection
sequelize
  .authenticate()
  .then(function (res) {
    console.log(`we have connected successfully`);
  })
  .catch(function (err) {
    console.log(err);
  });

// creating models

const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
    },
    rollNo: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.ENUM("1", "0"),
      defaultValue: "1",
    },
  },
  {
    modelNAme: "User",
  }
);

// sync Model

sequelize.sync();



// CREATE DATA TO TABLE
router.post("/user", function (req, res) {
    const { name, email, rollNo, status } = req.body;
  
    User.create({
      name,
      email,
      rollNo,
      status,
    })
      .then(function (data) {
        res.status(200).json({
          data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  
  router.get("/all-users", async(req, res) => {
  
      const getAllUsers = await User.findAll({
          where:{
              status:"0"
          }
      })
  
      const UserInfo = getAllUsers.map((data)=>{
         
          return {name:data.name, email:data.email}
      })
      
    res.status(200).json({
      message: "success",
     UserInfo
    });
  });

  router.put('/user/:id', async(req, res)=>{
    const {id} = req.params
    const { name, email, rollNo, status } = req.body;

    const updateValue = await User.update({
      name, email, rollNo, status
     

    },{
      where:{
        id
      }
    })
      res.status(200).json({
       message:"data successfuly updated"
      })

  })

  module.exports = router