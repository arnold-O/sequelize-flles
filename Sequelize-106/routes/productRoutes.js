const express = require("express");

const router = express.Router();

router.get("/products", (req, res) => {
  res.status(200).json({
    status: "sucess",
    message: "we are live",
  });
});

module.exports = router;