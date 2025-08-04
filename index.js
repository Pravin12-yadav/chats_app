const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const chatBox=require("./models/chat.js");
const methodOverride = require('method-override')

let app=express();
let port=8080;
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.listen(port,()=>{
    console.log("server is listening");
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/chat");
}

main().then(()=>{
    console.log("db connectesd");
}).catch((err)=>{
    console.log(err);
})
app.get("/",(req,res)=>{
    res.send("working");
})

app.get("/chats", async (req,res)=>{
    let all= await chatBox.find({});
    res.render("index.ejs",{all});
})

app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
   let find= await chatBox.findById(id);
   res.render("update.ejs",{find});
});

app.post("/chats/:id",(req,res)=>{
    let {id}=req.params;
    let {message}=req.body;
    chatBox.findByIdAndUpdate(id,{message:message}).then((res)=>{
        console.log(res);
    }).catch((Err)=>{
        console.log(Err);
    })
    res.redirect("/chats");
});

app.delete("/chats/:id",(req,res)=>{
    let {id}=req.params;
    chatBox.findByIdAndDelete(id).then((res)=>{
        console.log(res)
    }).catch((Err)=>{
        console.log(Err);
    })
    res.redirect("/chats");
})

app.get("/chats/new",(req,res)=>{
   res.render("new.ejs");
})

app.post("/chats",(req,res)=>{
    let{from,to,message}=req.body;
    chatBox.insertOne({
        from:from,
        to:to,
        message:message,
        created_at:new Date();
    }).then((res)=>{
        console.log(res);
    })
    res.redirect("/chats");
})
// let chat1=new chatBox({
//     from:"Pravin",
//     to:"Aman",
//     message:"Kya haal hai bhai",
//     created_at:new Date()
// });

// chat1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err)
// })