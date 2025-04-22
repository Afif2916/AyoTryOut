const express = require("express");
const {getAllQuestionType, getQuestionTypebyId, getQuestionByMaterial, createQuestionType, updateQuestiontype, deleteQuestionType} = require("../controller/questionTypeController")
const {tokenMiddleware, isAdmin} = require("../middleware/authMiddleware")
const router = express.Router();

router.get("/get-questions", getAllQuestionType);
router.get("/get-question/:id", getQuestionTypebyId)
router.get("/get-question-by-material/:id", getQuestionByMaterial)
router.post("/create-question",tokenMiddleware, isAdmin, createQuestionType)
router.put("/update-question/:id", tokenMiddleware, isAdmin, updateQuestiontype)
router.delete("/delete-question/:id", tokenMiddleware, isAdmin, deleteQuestionType)

module.exports = router;
