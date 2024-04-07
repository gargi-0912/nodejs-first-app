// N O D E JS
//console.log("Hi World!")

// const http = require("http");
// const gfName = require("./features");
// const { gfName2 } = require("./features");
import http from "http"; // Importing the built-in http module

//import champakchacha from "./features.mjs"; // Importing a default export from "./features"
//import champakchacha,{gfName2,gfName3} from "./features.mjs"; // Importing named export `gfName2` from "./features"
//console.log(champakchacha);
//import * as myObj from "./features.mjs"
//console.log(myObj.gfName2)
import {generateLovePercent} from "./features.mjs"
import fs from "fs"
// const home=fs.readFile("./index.html",()=>{
//     console.log("File Read")
// })
//console.log(home)
console.log(generateLovePercent());
const server=http.createServer((req,res)=>{
    //console.log("Servered");
    // console.log(req.url)
    // res.end("<h1>GARGI</h1>")
    if(req.url=="/about"){
        
        res.end(`<h1>Love is ${generateLovePercent()}</h1>`)

    }
   else if(req.url=="/"){
    fs.readFile("./index.html",(err,home)=>{
        res.end(home);
        })
    
    }
    else if(req.url=="/contact")
    {
        res.end("<h1>CONTACT PAGE</h1>");
    }
    else {
        res.end("<h1>Page not found</h1>");
    }

})
server.listen(9000,()=>{
    console.log("Server is working ");
})