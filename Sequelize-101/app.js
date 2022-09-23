const express = require('express')
const Sequelize = require('sequelize')

const app = express();


const sequelize = new Sequelize("sql_class", "root", "", {
    host:"localhost",
    dialect:"mysql"
})


// check DB connection
sequelize.authenticate().then(function(res){
    console.log(`we have connected successfully`)

}).catch(function(err){
    console.log(err)
})



// creating models

const User = sequelize.define('users',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
       
    },
    email:{
        type:Sequelize.STRING,
       
    },
    rollNo:{
        type:Sequelize.INTEGER
    },
    status:{
        type:Sequelize.ENUM('1', '0'),
        defaultValue:"1"
    }

},{
    modelNAme:"User"

})

// sync Model

sequelize.sync()

// CREATE DATA TO TABLE
app.post('/user', function(req, res){

    User.create({
        name:"arnold",
        email:"new@gmail.com",
        rollNo:2,
        status:0
    }).then(function(data){
        res.status(200).json({
            data
        })
    }).catch(function(error){
        console.log(error)
    }
    )
})



app.use('/', (req, res)=>{


res.status(200).json({
    message:"welcome all"
})
})


const PORT = 5000

app.listen(PORT, ()=>{
    console.log(`app listeining on port ${PORT}`)
})