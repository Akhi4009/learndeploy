const express=require("express")
const cors=require('cors')


require('dotenv').config()
const connection=require("./db")
const userRouter=require("./routes/user.route")
const todoRouter=require("./routes/todo.route")
const authentication=require("./middleware/middle")

const app=express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome!")
})
app.use("/user",userRouter)
app.use(authentication)
app.use("/todo",todoRouter)

const port =process.env.port||4500
app.listen(port,async()=>{
try{
    await connection
    console.log("connected to db")
}catch(err){
    console.log({"msg":"not connected","error":err.message})
}
console.log(`server is running in the port ${port}`)
})