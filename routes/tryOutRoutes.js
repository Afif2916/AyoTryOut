const express = require("express");
const {createTryOut, getTryOut, getTryOutById, updateTryOut, deleteTryOut} = require("../controller/tryOutController")
const {tokenMiddleware, isAdmin} = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/create-tryout", tokenMiddleware, isAdmin, createTryOut)
router.get("/get-tryout", tokenMiddleware, getTryOut)
router.get("/get-tryout/:id", tokenMiddleware, getTryOutById)
router.put("/update-tryout/:id", tokenMiddleware, isAdmin, updateTryOut)
router.delete("/delete-tryout/:id", tokenMiddleware, isAdmin, deleteTryOut)


module.exports = router;