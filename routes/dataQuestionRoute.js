const express = require("express");
const {
    getAllQuestion, getQuestionById, createQuestionBy, updateQuestion, deleteQuestion, getQuestionbyQuestionType, getQuestionByMaterialType
} = require("../controller/questionController")
const {tokenMiddleware, isAdmin,} = require("../middleware/authMiddleware")

const router = express.Router();


router.get("/get-dataquestion", getAllQuestion);
router.get("/get-dataquestion/:id", getQuestionById)
router.get("/get-dataquestion-bytype/:id", getQuestionbyQuestionType)
router.get("/get-dataquestion-bymaterial/:id", getQuestionByMaterialType)
router.post("/create-dataquestion", tokenMiddleware, isAdmin, createQuestionBy)
router.put("/update-dataquestion/:id", tokenMiddleware, isAdmin, updateQuestion)
router.delete("/delete-dataquestion/:id", tokenMiddleware, isAdmin, deleteQuestion)



module.exports = router