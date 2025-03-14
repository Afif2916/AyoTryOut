const express = require("express");
const cors = require("cors");
require("dotenv").config();

const answerRoutes = require("./routes/answerRoutes");
const materialroutes = require("./routes/materialRoutes")
const questionRoutes = require("./routes/questionRoute")
const dataQuestionRoute = require("./routes/dataQuestionRoute")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", answerRoutes);
app.use("/api", materialroutes)
app.use("/api", questionRoutes)
app.use("/api", dataQuestionRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
