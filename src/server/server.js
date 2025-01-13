const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const dbName = process.env.DB_NAME || "alphachat";
const uri = `mongodb://${username}:${password}@localhost:27017/${dbName}`;

app.use(cors());
app.use(express.json());

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

const badcommentSchema = new mongoose.Schema({
  comment: String,
});

const BadComment = mongoose.model("BadComment", badcommentSchema);

app.post("/BadComment", async (req, res) => {
  const { comment } = req.body;

  try {
    const newBadComment = new BadComment({
      comment,
    });

    await newBadComment.save();

    res.status(201).send({
      message: "BadComment created successfully!",
      badcomment: newBadComment,
    });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error creating BadComment", error: error.message });
  }
});

const qnaSchema = new mongoose.Schema({
  question: String,
  answer: String,
  date: String,
});

const QnA = mongoose.model("QnA", qnaSchema);

app.post("/QnA", async (req, res) => {
  const { question, answer, date } = req.body;

  try {
    const newQnA = new QnA({
      question,
      answer,
      date,
    });

    await newQnA.save();

    res.status(201).send({ message: "QnA created successfully!", qna: newQnA });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error creating QnA", error: error.message });
  }
});

const botNameSchema = new mongoose.Schema({
  name: String,
  fname: String,
  isLightMode: Boolean,
});

const BotName = mongoose.model("BotName", botNameSchema);

app.put("/api/botname", async (req, res) => {
  const { name, fname, isLightMode } = req.body;

  try {
    const bot = await BotName.findOne();

    if (bot) {
      if (name) bot.name = name;
      if (fname) bot.fname = fname;
      if (isLightMode !== undefined) bot.isLightMode = isLightMode;

      await bot.save();

      res.json({
        message: "Bot updated successfully",
        bot: {
          name: bot.name,
          fname: bot.fname,
          isLightMode: bot.isLightMode,
        },
      });
    } else {
      const newBot = new BotName({ name, fname, isLightMode });
      await newBot.save();

      res.status(201).json({
        message: "Bot created successfully",
        bot: newBot,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating bot", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
