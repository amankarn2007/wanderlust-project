const express = require("express");
const router = express.Router();


//POSTS
// Index
router.get("/", (req,res) => {
    res.send("GET for posts");
})

// Show
router.get("/:id", (req,res) => {
    res.send("GET for show posts");
})

// Post
router.delete("/",(req,res) => {
    res.send("DELETE for posts")
})

// Delete
router.post("/:id",(req,res) => {
    res.send("POST for post id")
})

module.exports = router;