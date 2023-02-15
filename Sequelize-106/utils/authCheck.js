const AppError = require("./appError");

exports.authorize = (...roles) => {
    return (req, res, next) => {
      
      if (!roles.includes(req.user.user_plan)) {
        return next(new AppError("hey there, you are not authorized", 401));
      }
      next();
    };
  };