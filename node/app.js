const translate = require('translate-google')
const express=require('express')
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cors())
app.post('/convert',async(req,res)=>{
    try {
        const {text,from,to}=req.body
        const t=await translate(text, {from: from, to: to})
        res.status(200).json({translated:t})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message:error.message})
    }
})
app.post('/chatbot',async(req,res)=>{
    try {
        console.log(req.body)
        res.status(200).json({response:'message goes heere'})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message:error.message})
    }
})
app.listen(5000,()=>{
    console.log('server on')
})