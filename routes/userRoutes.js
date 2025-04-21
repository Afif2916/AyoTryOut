const express = require("express");
const {registerController, getUser, getUserById, updateUser} = require("../controller/userController")

const router = express.Router();

router.post("/register", registerController)
router.get("/get-user", getUser)
router.get("/get-user/:id", getUserById)
router.put("/update-user/:id", updateUser)


module.exports = router