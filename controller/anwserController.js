const pool = require("../utils/db");

// Simpan jawaban user
const saveAnswer = async (req, res) => {
  try {
    const { user_id, question_id, answer } = req.body;

    const existingAnswer = await pool.query(
      "SELECT * FROM user_answers WHERE user_id = $1 AND question_id = $2",
      [user_id, question_id]
    );

    if (existingAnswer.rows.length > 0) {
      await pool.query(
        "UPDATE user_answers SET answer = $1, updated_at = NOW() WHERE user_id = $2 AND question_id = $3",
        [answer, user_id, question_id]
      );
    } else {
      await pool.query(
        "INSERT INTO user_answers (user_id, question_id, answer) VALUES ($1, $2, $3)",
        [user_id, question_id, answer]
      );
    }

    res.json({ message: "Jawaban disimpan!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

// Ambil jawaban user
const getUserAnswers = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await pool.query(
      "SELECT question_id, answer FROM user_answers WHERE user_id = $1",
      [user_id]
    );
    console.log(result.rows)
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

module.exports = { saveAnswer, getUserAnswers };
