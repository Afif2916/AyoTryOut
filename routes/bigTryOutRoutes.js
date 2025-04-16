const express = require("express");
const { createBigTryOut, getBigTryOut, getBigTryOutById, updateBigTryOut, deleteBigTryOut } = require("../controller/bigTryOutController")
const router = express.Router();

router.post("/create-big-tryout", createBigTryOut)
router.get("/get-big-tryout", getBigTryOut)
router.get("/get-big-tryout/:id", getBigTryOutById)
router.put("/update-big-tryout/:id", updateBigTryOut)
router.delete("/delete-big-tryout/:id", deleteBigTryOut)


module.exports = router;