const express=require("express");
const cors=require("cors");
const emailer=require("./emailer").sendMail;
const app=express();

app.use(cors());
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded())

let port=process.env.PORT||3001

app.get("/",(req,res)=>{
    res.sendFile(__dirname+`public/index.html`)
})

app.post("/form-submit",(req,res)=>{
    console.log(req.body)
        emailer(req.body.email)
    res.status(201).json({
        status:"success"
    })
})


app.listen(port,()=>{
console.log("server started");
})
