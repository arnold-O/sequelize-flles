const express = require("express");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

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
  const { name, email, status } = req.body;
  const emailAlrrreadyExist = User.findOne({
    where: {
      email,
    },
  });
  if (emailAlrrreadyExist) {
    return res.status(404).json({
      message: "Email already exist",
    });
  }

  let password = bcrypt.hashSync(req.body.password, 10);
  try {
    const newUser = await User.create({
      name,
      email,
      password: password,
      status,
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
    if(bcrypt.compareSync(password, loginUser.password)){
      res.status(200).json({
        msg:"welcome, ${loginUser.email}"
      })

    }
  } catch (error) {
    console.log(error)
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`app listeining on port ${PORT}`);
});
