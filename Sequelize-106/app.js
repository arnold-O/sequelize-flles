const express = require("express");
const globalErrorHandler = require("./middleware/errorHandler");
const ProductRoutes = require("./routes/productRoutes");
const studentRouter = require("./routes/studentRoutes");
const UserRouter = require("./routes/userRoutes");
const EmailRouter = require("./routes/emailRoutes");
const PostRouter = require("./routes/postRoutes");
const CommentRouter = require("./routes/commentRoute");
const AppError = require("./utils/appError");

const app = express();

app.use(express.json());

// routes
app.use("/api/v1", ProductRoutes);
app.use("/api/v1", studentRouter);
app.use("/api/v1", UserRouter);
app.use("/api/v1", EmailRouter);
app.use("/api/v1", PostRouter);
app.use("/api/v1", CommentRouter);



// Error Handler
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
});

app.use(globalErrorHandler);



const PORT = 4500;
app.listen(PORT, () => {
  console.log(`APP running on port ${PORT}`);
});
