const express = require("express");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require("./config/jwt.config");

const app = express();
app.use(express.json());

const sequelize = new Sequelize("sql_class_jwt", "root", "", {
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

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  },
  {
    modelNAme: "User",
  }
);

sequelize.sync();

// routes handler

app.post("/post", async (req, res) => {
  try {
    const { name, email, password} = req.body;

    if (!name || !email || !password) {
      return res.json({
        msg: "please provide name, email and password",
      });
    }

    const emailAlrrreadyExist = await User.findOne({
      where: {
        email,
      },
    });
    if (emailAlrrreadyExist) {
      return res.status(404).json({
        message: "Email already exist",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
     
    });
    res.status(200).json({
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(400).json({
        message: "please provide the name or password",
      });
    }

    const loginUser = await User.findOne({
      where: {
        email,
      },
    });
    if (!loginUser) {
      return res.status(404).json({
        message: "no user with this credentials",
      });
    }
    if (bcrypt.compareSync(password, loginUser.password)) {
      let userTOken = jwt.sign({name:loginUser.name, id:loginUser.id}, secret, {
        expiresIn
      })
      res.status(200).json({
        msg: `welcome, ${loginUser.name}`,
        userTOken
      });
    }
    2;
  } catch (error) {
    res.status(404).json({
      msg: error,
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`app listeining on port ${PORT}`);
});
