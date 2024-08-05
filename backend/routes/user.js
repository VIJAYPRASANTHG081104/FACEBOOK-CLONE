const express = require("express");
const {
  register,
  login,
  activateAccount,
  sendVerification,
  findUser,
  sendResetPasswordCode,
  validateResetcode,
  changePassword,
  getProfile,
  updateProfilePicture
} = require("../controllers/user");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/activate", authUser, activateAccount);
router.post("/sendverification", authUser, sendVerification);
router.post("/finduser", findUser);
router.post("/sendresetpasswordcode", sendResetPasswordCode);
router.post("/validateresetcode",validateResetcode);
router.post("/changepassword",changePassword);
router.get("/getProfile/:username",authUser,getProfile);
router.put("/updateProfilePicture",authUser,updateProfilePicture);

module.exports = router;
