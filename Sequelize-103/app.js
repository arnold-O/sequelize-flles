const express = require('express')
const product = require('./models/product')

const app = express()
const productRoutes = require('./routes/product')



const PORT = 4600

app.use('/products', productRoutes)



app.post('/',async(req, res)=>{
    try {
        const data = await product.create({
            name:"arnold",
              des:"this is crazy",
              amount:1234
        })

       
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

app.listen(PORT, ()=>{
    console.log(`we runing on port ${PORT}`)
})