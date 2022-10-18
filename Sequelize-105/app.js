const express = require("express");
const bcrypt = require("bcrypt");
const models = require("./models");
const jwt= require('jsonwebtoken');

const app = express();
const PORT = 3000;

app.use(express.json());
const createToken = (data)=>{

    return jwt.sign({data}, "this-is-the-secret", {expiresIn:'5d'})
}

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

  const token = createToken(doc.id)

  res.status(201).json({
    data: doc,
    token
  });
});

// const protect = async (req, res, next) => {
//     let token;
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       token = req.headers.authorization.split(" ")[1];
//     }
   
  
//     if (!token) {
//       return res.status(404).json({
//         status:"fail",
//         message:"please login again"
//       });
//     }
//     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
//     const currentUser = await User.findById(decoded.id);
  
//     if (!currentUser) {
//       return next(
//         new AppError("The User belonging to this token do not  exist", 401)
//       );
//     }
  
//     if (currentUser.changedPasswordAfter(decoded.iat)) {
//       return next(new AppError("Please login Again", 401));
//     }
  
//     req.user = currentUser;
//     next();
//   });
  

app.post('/login', (req, res)=>{
    const { email, password } = req.body;

    if (!email || !password) {
        return   res.status(404).json({
            status: "fail",
            message: "please provide Email and Password",
          });
      }


      const user = models.User.findOne({
        where:{email}
      })

      if(!user){
        return   res.status(404).json({
            status: "fail",
            message: "pno user with the above credentials",
          });

      }


})

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
