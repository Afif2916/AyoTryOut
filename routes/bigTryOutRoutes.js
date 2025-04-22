const express = require("express");
const { createBigTryOut, getBigTryOut, getBigTryOutById, updateBigTryOut, deleteBigTryOut } = require("../controller/bigTryOutController")
const router = express.Router();
const {tokenMiddleware, isAdmin,} = require("../middleware/authMiddleware")

router.post("/create-big-tryout", tokenMiddleware, isAdmin, createBigTryOut)
router.get("/get-big-tryout", getBigTryOut)
router.get("/get-big-tryout/:id", getBigTryOutById)
router.put("/update-big-tryout/:id", tokenMiddleware, isAdmin, updateBigTryOut)
router.delete("/delete-big-tryout/:id", tokenMiddleware, isAdmin, deleteBigTryOut)


module.exports = router;