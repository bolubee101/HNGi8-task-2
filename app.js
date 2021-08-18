const express=require("express");
const cors=require("cors");
const app=express();

app.use(cors());
app.use(express.static('public'))

let port=process.env.PORT||3001

app.get("/",(req,res)=>{
    res.sendFile(__dirname+`public/index.html`)
})


app.listen(port,()=>{
console.log("server started");
})
