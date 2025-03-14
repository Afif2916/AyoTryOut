const express = require("express");
const {getAllQuestionType, getQuestionTypebyId, getQuestionByMaterial, createQuestionType, updateQuestiontype, deleteQuestionType} = require("../controller/questionTypeController")

const router = express.Router();

router.get("/get-questions", getAllQuestionType);
router.get("/get-question/:id", getQuestionTypebyId)
router.get("/get-question-by-material/:id", getQuestionByMaterial)
router.post("/create-question", createQuestionType)
router.put("/update-question/:id", updateQuestiontype)
router.delete("/delete-question/:id", deleteQuestionType)

module.exports = router;
