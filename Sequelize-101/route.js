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

// sequelize.sync();

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

router.get("/all-users", async (req, res) => {
 try {
  const getAllUsers = await User.findAll({
    where: {
      
    },
    
  });
  const UserInfo = getAllUsers.map((data) => {
      return { name: data.name, email: data.email };
    });
  
    res.status(200).json({
      message: "success",
      UserInfo,
    });
  
 } catch (error) {
  
  res.status(500).json({
    data:error
  })
  
 }

  
});

router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, rollNo, status } = req.body;

  await User.update(
    {
      name,
      email,
      rollNo,
      status,
    },
    {
      where: {
        id,
      },
    }
  );
  res.status(200).json({
    message: "data successfuly updated",
  });
});
router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  await User.destroy({
    where: {
      id,
    },
  });
  res.status(200).json({
    message: "data successfuly deleted",
  });
});


router.get('/raw-query', async(req, res)=>{
  const rawQuery = await sequelize.query('select * from users',{
    type:sequelize.QueryTypes.SELECT
  })

  res.status(200).json({
    rawQuery
  })
})

module.exports = router;
