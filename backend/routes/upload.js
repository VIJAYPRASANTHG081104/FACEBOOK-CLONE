const express = require("express");

const {uploadImages,listImages} = require('../controllers/upload');
const imageUpload = require('../middlewares/imageUpload')
const {authUser} = require("../middlewares/auth");

const router = express.Router();

router.post("/uploadimages",authUser,imageUpload,uploadImages);
router.post("/listImages",authUser,listImages);


module.exports = router;