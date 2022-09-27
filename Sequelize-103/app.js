const express = require('express')

const app = express()



const PORT = 4600


app.get('/', (req, res)=>{
    



    res.send('we here')
})

app.listen(PORT, ()=>{
    console.log(`we runing on port ${PORT}`)
})