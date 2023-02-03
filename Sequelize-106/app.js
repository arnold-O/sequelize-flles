const express = require('express')
const ProductRoutes = require('./routes/productRoutes')



const app = express()

// routes
app.use('/api/v1', ProductRoutes)



  

const PORT = 4500
app.listen(PORT, ()=>{

    console.log(`APP running on port ${PORT}`)
})