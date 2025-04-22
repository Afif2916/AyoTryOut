const express = require("express");
const {registerController, getUser, getUserById, updateUser, loginController} = require("../controller/userController")
const { tokenMiddleware, isAdmin } = require("../middleware/authMiddleware")
const router = express.Router();

router.post("/register", registerController)
router.get("/get-user", tokenMiddleware, isAdmin, getUser)
router.get("/get-user/:id", tokenMiddleware, getUserById)
router.put("/update-user/:id", tokenMiddleware, updateUser)
router.post("/login", loginController)


module.exports = router