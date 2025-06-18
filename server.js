const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("client"));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Result = mongoose.model("Result", {
  type: String,
  reactionTime: Number,
  timestamp: Date
});

app.post("/api/results", async (req, res) => {
  const { type, reactionTime, timestamp } = req.body;
  const result = new Result({ type, reactionTime, timestamp });
  await result.save();
  res.json({ message: "저장 완료" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`서버 실행 중: http://localhost:${PORT}`));