const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { title } = require("process");

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));


app.get("/",function(req,res){
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files});
    })
})

app.get("/files/:filename",function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,data){
        res.render("show",{filename:req.params.filename,filedata:data});
    })
})

app.post("/create",function(req,res){
   fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.description,function(err){
       if(err){
           console.log(err);
       }
       res.redirect("/");
   })

})


app.listen(3000,function(){
    console.log("Server Started");
})