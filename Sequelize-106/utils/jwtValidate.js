const jwt = require("jsonwebtoken");
const AppError = require("./appError");
const catchAsyncErrors = require("./catchAsyncErrors");
const StudentModel = require("../models").Student;

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

  
    const  userDetails  = await StudentModel.findOne({ where: { id: decodedData.id } });
   req.user = userDetails.id
    next();
  
 } catch (error) {
  return next(new AppError("Invalid Token please do better", 401));
  
 }
    
  
};
