const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

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

main()
    .then( () => {
        console.log("connected to DB");
    })
    .catch( (err) => {
        console.log(err);
    })
const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "68d6bd582ee6623ef5903e23"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();