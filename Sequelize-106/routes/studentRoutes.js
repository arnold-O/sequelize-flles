const express = require("express"); 
const StudentModel = require("../models").Student; 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");


const router = express.Router()




router.post('/student', async (req, res)=>{

    const createStudent = await StudentModel.findOne({
        where:{
            email:{
                [Op.eq]:req.body.email
            }
        }
    })

    if(createStudent){
        return res.status(500).json({
            status:"Fail",
            message:"User already exist"
        });

    }else{
        const {name, email, password, roll_no} = req.body
            const newStudent = await StudentModel.create({
            name,
            email,
            roll_no,
            password: bcrypt.hashSync(password, 10)

        })
        return  res.status(200).json({
            status:"success, User created successfully",
            data: newStudent
        })



    }

})



module.exports = router





