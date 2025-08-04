const mongoose=require("mongoose");

let chatSchema=new mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        maxLength:50
    },
    created_at:{
        type:Date
    }
})

const chatBox=mongoose.model("chatBox",chatSchema);
module.exports=chatBox;