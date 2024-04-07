import express from 'express'
import path from "path"
import mongoose from "mongoose";
import { name } from 'ejs';
import cookieParser from 'cookie-parser';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName:"backend"
}).then(()=>console.log("Database Connected")).catch(e=>console.log(e));

// const messageSchema=new mongoose.Schema({
//     name:String,
//     email:String,
// });
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
});
//collection aise bnayein
// const Messge=mongoose.model("Message",messageSchema)
const User=mongoose.model("Message",userSchema)
const server=express();

    //res.send("Hi");
    //res.sendStatus(404);
    // res.json({
    //     success:true,
    //     products:[],
    // })
    //res.status(400).send("Meri marzi");
    // const pathlocation=path.resolve();
    // res.sendFile(path.join(pathlocation,"./index.html"))
   //const users=[];
   
   //using middlewares
   server.use(express.static(path.join(path.resolve(),"public")))
   server.use(express.urlencoded({extended:true}));
   server.use(cookieParser());
   //setting up view engine
    server.set("view engine","ejs");//ya to set kro ya fir index.ejs likho neeche wali line mai
    const isAuthenticated=async(req,res,next)=>{
        const {token}=req.cookies;
        if(token){
            const decoded=jwt.verify(token,"jhghjghhgjhg");
            req.user=await User.findById(decoded._id);
           next();
        }
        else{
            res.redirect("/login");
        }
    }
   
    // server.get("/",(req,res)=>{
    //  //res.render("index",{name:"Gupta"})
    //  //console.log(req.cookies);
    //  const {token}=req.cookies;
    //  if(token){
    //     res.render("logout");

    //  }
    //  else{
    //     res.render("login")
    //  }
    //  res.render("login")
    //  //res.sendFile("index")  
    // })
    // server.get("/add",async(req,res)=>{
    //    await Messge.create({name:"Abhi2",email:"sample2@gmail.com"}).then(()=>{
    //         res.send("Nice");
    //     })
       

    // })
    server.get("/",isAuthenticated,(req,res)=>{
        //console.log(req.user)
        res.render("logout",{name:req.user.name});
    })
    server.get("/login",(req,res)=>{
        res.render("login");
    })
    server.get("/register",(req,res)=>{
        //console.log(req.user)
        res.render("register");
    })
server.post("/login",async(req,res)=>{
    const{email,password}=req.body;
let user=await User.findOne({email});
if(!user) return res.redirect("/register");
const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch) return res.render("login",{email,message:"Incorrect password"});
const token=jwt.sign({_id:user._id},"jhghjghhgjhg");
//console.log(token);
res.cookie("token",token,{
    httpOnly:true, expires : new Date(Date.now()+60*1000)
});
res.redirect("/");

})
    //user login hai ya nhi ye cookie btata hai
    server.post("/register",async(req,res)=>{
        const {name,email,password}=req.body;
        let user=await User.findOne({email})
        if(user){
                return res.redirect("/login")
        }
        const hashedPassword=await bcrypt.hash(password,10);
         user=await User.create({
            name,
            email,
            password:hashedPassword,
        });
        // //secret id jhghjghhgjhg
        const token=jwt.sign({_id:user._id},"jhghjghhgjhg");
        //console.log(token);
        res.cookie("token",token,{
            httpOnly:true, expires : new Date(Date.now()+60*1000)
        });
        res.redirect("/");
        
    })
    server.get("/logout",(req,res)=>{
        res.cookie("token",null,{
            httpOnly:true, 
            expires : new Date(Date.now())
        });
        res.redirect("/");
        
    })
    // server.get("/success",(req,res)=>{
    //     res.render("success");
    //     //res.sendFile("index")  
    //    });


       //form mai filled data ko database mai daalne ka tareeka
    // server.post("/",async(req,res)=>{
    //     //console.log(req.body.name);
    //     //users.push({username:req.body.name,email:req.body.email});
    //    const{name,email}=req.body;
    //     //console.log(messageData)
    //     //res.render("success.ejs");
    //     // await Messge.create({name:req.body.name,email:req.body.email})
    //     await Messge.create({name,email});
    //     res.redirect("/success");


    // });


// server.get("/users",(req,res)=>{
//     res.json({
//         users,
//     });
// });


server.listen(7000,()=>{
    console.log("Server is working")
})