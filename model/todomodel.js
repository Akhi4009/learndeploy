const mongoose=require("mongoose")

const todoSchema=mongoose.Schema({
    title:{type:String,required:true},
    status:{type:Boolean,default:false},
    user:{type:String}
},{
    versionKey:false
})

const Todo=mongoose.model("todo",todoSchema)
module.exports=Todo