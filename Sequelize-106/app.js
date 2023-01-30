const express = require('express')



const app = express()




// routes

app.get('/',(req, res)=>{



    res.status(200).json({
        status:"sucess",
        message:"we are live"
    })

})





const PORT = 4500
app.listen(PORT, ()=>{

    console.log(`APP running on port ${PORT}`)
})