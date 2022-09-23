const express = require("express");
const Sequelize = require("sequelize");
const AllRoutes = require('./route')

const app = express();
app.use(express.json());

const sequelize = new Sequelize("sql_class", "root", "", {
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



// routes handler
app.use('/', AllRoutes)


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`app listeining on port ${PORT}`);
});
