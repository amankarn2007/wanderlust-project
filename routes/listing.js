const express = require("express");
let router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, validateListning, isOwner} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


//Index Route and Create Route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListning,
        wrapAsync(listingController.createListing)
    );


//New Route
router.get("/new", isLoggedIn, listingController.renderNewFrom);


//Show Route and Update Route and Delete Route
router
    .route("/:id") // ("/:id") pe show ,update and delete tino req aayega
    .get(
        wrapAsync(listingController.showListing)
    )
    .put(
        isLoggedIn,
        isOwner,
        validateListning,
        upload.single('listing[image]'),
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner, 
        wrapAsync(listingController.destroyListing)
    )


//Edit Route
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);

// Category Route
router.get("/category/:category", listingController.categoryFilter);

module.exports = router;