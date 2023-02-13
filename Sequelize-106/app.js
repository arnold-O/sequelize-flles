const express = require("express");
const ProductRoutes = require("./routes/productRoutes");
const studentRouter = require("./routes/studentRoutes");
const AppError = require("./utils/appError");

const app = express();

app.use(express.json());

// routes
app.use("/api/v1", ProductRoutes);
app.use("/api/v1", studentRouter);



// Error Handler
app.all("*", (req, res, next) => {
  // const err = new Error(`can't find ${req.originalUrl} on this server`);
  // err.statusCode = 404;
  // err.status = "fail";
  // next(err);

  next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const PORT = 4500;
app.listen(PORT, () => {
  console.log(`APP running on port ${PORT}`);
});
