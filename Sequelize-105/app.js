const express = require("express");
const bcrypt = require("bcrypt");
const models = require("./models");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const app = express();

const PORT = 5000;

app.use(express.json());

const createToken = (id) => {
  return jwt.sign({ id }, "this-is-the-secret", { expiresIn: "5d" });
};
const correctpassword = async function (enteredPassword, userPassword) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

// @desc     Register User
// @route   /api/v1/auth/register
// @access   Public

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


// @desc     Login User
// @route   /api/v1/auth/login
// @access   Public 

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

app.get("/", async (req, res, next) => {
  const allUser = await models.User.findAll({});

  return res.status(200).json({
    allUser,
  });
});

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(400).json({
      status: "fail",
      message: "please login again ",
    });
  }
  const decoded = await promisify(jwt.verify)(token, "this-is-the-secret");

  const currentUser = await models.User.findOne({ where: { id: decoded.id } });

  if (!currentUser) {
    return res.status(400).json({
      status: "fail",
      message: "please login again ",
    });
  }
  req.user = currentUser;
  next();
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(400).json({
        status: "fail",
        message: "you do not have permission",
      });
    }

    next();
  };
};

app.post("/createproduct", protect, restrictTo("user"), (req, res) => {
  res.json({
    msg: "ok",
  });
});
