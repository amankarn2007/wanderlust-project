const express = require("express");
let app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash")
const path = require("path")

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"cookie view"));

const sessionOptions = {
    secret: "mysuperstring",
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionOptions));
app.use(flash());

// Middleware
app.use((req,res,next) => {
    res.locals.succMsg = req.flash("success");
    res.locals.errMsg = req.flash("error");
    next();
});

app.get("/register", (req,res) => {
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    if(name === "anonymous"){
        req.flash("error","user not registerd!");
    }
    else req.flash("success","user registerd successfully!");
    res.redirect("/hello")
})
app.get("/hello",(req,res) => {
    res.render("page.ejs",{name: req.session.name});
})

app.get("/reqCount",(req,res) => {
    if(req.session.count){
        req.session.count++;
    }
    else req.session.count = 1;
    res.send(`you send a message ${req.session.count} times`);
})

//app.use(cookieParser("secretcode"));


//app.get("/getsignedcookie", (req,res) => {
//    res.cookie("made-In", "india",{signed: true});
//    res.send("signed cookie sent");
//});

//app.get("/verify", (req,res) => {
//    console.log(req.signedCookies);
//    res.send("verified")
//});

//app.get("/getcookies", (req,res) => {
//    res.cookie("greet","namaste");
//    res.cookie("practice","testing");
//    res.send("sent you some cookies");
//});

//app.get("/", (req,res) => {
//    console.dir(req.cookies);
//    res.send("Hi i am root");
//});

//app.get("/greet",(req,res) => {
//    let {name = "anonymous"} = req.cookies;
//    res.send(`Hi, ${name}`);
//});

////this will use useres route from ./routes/user.js
//app.use("/users",users);

////this will use posts route from .routes/post.js
//app.use("/posts",posts);

app.listen(3000, () => {
    console.log("server is listning to port 3000");
});