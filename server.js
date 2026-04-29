const express = require("express");
const cors = require("cors");
const Anthropic = require("@anthropic-ai/sdk");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    system: "Du är en hjälpsam kundtjänstassistent som svarar på svenska.",
    messages: [{ role: "user", content: message }],
  });

  res.json({ reply: response.content[0].text });
});

app.get("/", (req, res) => {
res.sendFile(__dirname + "/public/landing.html");});

app.listen(3000, () => {
  console.log("Server körs på http://localhost:3000");
});