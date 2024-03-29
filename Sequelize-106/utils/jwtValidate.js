const jwt = require("jsonwebtoken");
const AppError = require("./appError");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models").User;

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // token in Header
    token = req.headers.authorization.split(" ")[1];
  }else{
    return next(new AppError("Please provide authorization headers", 401));
  }

  if (!token) {
    return next(new AppError("Not authorized to access this route", 401));
  }
 try {
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedData.id)
  
  const  userDetails  = await User.findByPk(decodedData.id);
  
   req.user = userDetails
    next();
  
 } catch (error) {
  return next(new AppError("Invalid Token please do better", 401));
  
 }
    
  
};
