const express = require("express");

const {uploadImages} = require('../controllers/upload');
const imageUpload = require('../middlewares/imageUpload')
const {authUser} = require("../middlewares/auth");

const router = express.Router();

router.post("/uploadimages",authUser,imageUpload,uploadImages)

module.exports = router;