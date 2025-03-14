const express = require("express");
const { saveAnswer, getUserAnswers } = require("../controller/anwserController");

const router = express.Router();

router.post("/save-answer", saveAnswer);
router.get("/load-answers/:user_id", getUserAnswers);

module.exports = router;
