const mongoose=require("mongoose");
const chatBox=require("./models/chat.js");
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/chat")
}
main().then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
})

let allChat=[
    {
        from:"amit",
        to:"sumit",
        message:"All the best",
        created_at:new Date()
    },
        {
        from:"anita",
        to:"ramesh",
        message:"bring me some fruits",
        created_at:new Date()
    },
        {
        from:"tony",
        to:"peter",
        message:"I love you 3000",
        created_at:new Date()
    },
        {
        from:"Yuvraj",
        to:"virj",
        message:"how are you",
        created_at:new Date()
    },
        {
        from:"mohit",
        to:"raunauk",
        message:"come fast",
        created_at:new Date()
    },
]

chatBox.insertMany(allChat).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
})