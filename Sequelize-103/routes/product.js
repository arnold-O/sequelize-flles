const express = require('express')
const product = require('../models/product')

const router = express.Router()



router.get('/', async(req, res)=>{


    try {
        const data = await product.findAll()

       
            res.status(200).json({
                data,
                msg:"success"
            })
        
        
    } catch (error) {
        res.status(500).json(
            error
        )
    }
   

})



module.exports = router