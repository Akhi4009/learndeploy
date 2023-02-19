const express=require("express")

const Todo=require("../model/todomodel")

const router=express.Router()

router.post("/create",async(req,res)=>{
    const payload=req.body
    try{
        const todo=new Todo(payload)
        await todo.save()
        res.status(200).send({"msg":"todo added"})
    }catch(err){
        res.status(404).send({"msg":"something goes wrong","err":err.message})
    }

})
router.get("/",async(req,res)=>{
    
    try{
        const todo=await Todo.find({user:req.body.user})
        console.log()
        res.status(200).send({"msg":"successfull","Todo":todo})
    }catch(err){
        res.status(404).send({"msg":"something goes wrong","err":err.message})
    }
    
})

router.patch("/update/:id",async(req,res)=>{
    const id=req.params.id
    const payload=req.body
    const todo=await Todo.findOne({"_id":id})
     console.log(payload)
   const userID=req.body.user
    console.log(userID)
    try{
        if(todo.user!==userID){
            res.send({"msg":"You are not authorized to perform this operation"})
        }else{
            await Todo.findByIdAndUpdate({"_id":id},payload)
            res.send({"msg":"updated todo"})
        }

    }catch(err){
        res.send({"msg":"Something went wrong"})
    }

})


router.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    
    const todo=await Todo.findOne({"_id":id})
   
   const userID=req.body.user
    console.log(userID)
    try{
        if(todo.user!==userID){
             res.send({"msg":"You are not authorized to perform this operation"})
        }else{
            await Todo.findByIdAndDelete({"_id":id})
          
             res.send({"msg":"Deleted todo"})
         }

     }catch(err){
        res.send({"msg":"Something went wrong",err:err.message})
    }
   

})

module.exports=router