if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
let app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const MongoStore = require("connect-mongo");
const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main(){
    // username aur password ke sath connectionn karna padta hai
    await mongoose.connect(MONGO_URL, {
        auth: {
            username: "amanAdmin",
            password: "Backend@987"
        },
        authSource: "admin"
    });
}

//const dbUrl = process.env.ATLASDB_URL; // Cloud Database se connect

//async function main(){
//    await mongoose.connect(MONGO_URL);
//}

main()
    .then( () => {
        console.log("connected to DB");
    })
    .catch( (err) => {
        console.log(err);
    })

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


//const store = MongoStore.create({
//    mongoUrl: dbUrl,
//    crypto: {
//        secret: process.env.SECRET,
//    },
//    touchAfter: 24 * 3000,
//})

//store.on("error", () => {
//    console.log("ERROR IN MONGO SESSION STORE",err);
//});


const sessionOptions = { // record session using cookies
    //store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}


// Session setup
app.use(session(sessionOptions));
app.use(flash());

// Passport initialize
app.use(passport.initialize() );
app.use(passport.session() );

// Authentication strategy
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next) => { //show success/error on EJS page
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

//app.get("/", (req,res) => {
//    res.send("Hi, I am root");
//})

app.use("/listings",listingRouter);// "/listings" ka sara req listingRout ke paas jayeag
app.use("/listings/:id/reviews",reviewsRouter); // sara req reviewsRouter ke paas
app.use("/",userRouter); // signup,login,logout req userRouter ke paas

app.use( (req,res,next) => { // If route not matches, then this work
    next(new ExpressError(404, "Page not found!"));
});

app.use((err,req,res,next) => { // Error midd -> sare err me ye midd chalega
    let {statusCode = 500, message = "Something went wrong"} = err;
    res.status(statusCode).render("error.ejs",{message});
});

app.listen(8080, () => {
    console.log("server is listenig on port 8080");
});