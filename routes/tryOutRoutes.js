const express = require("express");
const {createTryOut, getTryOut, getTryOutById, updateTryOut, deleteTryOut} = require("../controller/tryOutController")

const router = express.Router();

router.post("/create-tryout", createTryOut)
router.get("/get-tryout", getTryOut)
router.get("/get-tryout/:id", getTryOutById)
router.put("/update-tryout/:id", updateTryOut)
router.delete("/delete-tryout/:id", deleteTryOut)


module.exports = router;