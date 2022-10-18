const express = require("express");
const bcrypt = require("bcrypt");
const models = require("./models");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

app.use('/uploads', express.static('uploads'))

app.use(express.json());

const createToken = (data) => {
  return jwt.sign({ data }, "this-is-the-secret", { expiresIn: "5d" });
};
const correctpassword = async function (enteredPassword, userPassword) {
  return await bcrypt.compare(enteredPassword, userPassword);
};



app.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;

  const checker = await models.User.findOne({
    where: {
      email: email,
    },
  });
  if (checker) {
    return res.status(404).json({
      status: "fail",
      data: "user already exist",
    });
  }

  const doc = await models.User.create({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  });

  const token = createToken(doc.id);

  res.status(201).json({
    data: doc,
    token,
  });
});



app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      status: "fail",
      message: "please provide Email and Password",
    });
  }

  const user = await models.User.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "No User with the above credentials",
    });
  }

  const passwordCheck = await correctpassword(password, user.password);

  if (!passwordCheck) {
    return res.status(404).json({
      status: "fail",
      message: "invalid credentials",
    });
  }

  const token = createToken(user.id);

  res.status(201).json({
    data: user,
    token,
  });
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

app.get('/', async (req, res, next)=>{

    const allUser = await models.User.findAll({})

    return res.status(200).json({
        allUser
    })

})


app.post('create')