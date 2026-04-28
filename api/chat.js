const Anthropic = require("@anthropic-ai/sdk");

module.exports = async (req, res) => {
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const { message } = req.body;

  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    system: "Du är en hjälpsam kundtjänstassistent som svarar på svenska.",
    messages: [{ role: "user", content: message }],
  });

  res.json({ reply: response.content[0].text });
};