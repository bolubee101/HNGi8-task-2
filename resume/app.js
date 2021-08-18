const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const emailer = require("./emailer").sendMail;
const app = express();
const submission = require("./submissionModel")

mongoose.connect(process.env.DBURI,{ useUnifiedTopology: true, useNewUrlParser: true  }, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("connected to DB successfully")
    }
})

app.use(cors());
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded())

let port = process.env.PORT || 3001

app.get("/", (req, res) => {
    res.sendFile(__dirname + `/public/index.html`)
})

app.post("/form-submit", async (req, res) => {
    console.log(req.body)
    let sub = new submission(req.body);
    try {
        await sub.save();
        emailer(req.body.email, "HNG backend task 2", `You filled this out in your form:  "${req.body.subject}"`)
        res.status(201).json({
            status: "success"
        })
    } catch (err) {
        return res.status(400).json({
            status: "error"
        })
    }

})


app.listen(port, () => {
    console.log("server started");
})
