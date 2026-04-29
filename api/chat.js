const Anthropic = require("@anthropic-ai/sdk");

module.exports = async (req, res) => {
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const { message, history, system } = req.body;

  const systemPrompt = system || "Du är en hjälpsam kundtjänstassistent som svarar på svenska.";
  
  const conversationHistory = history && history.length > 1 
    ? history.slice(0, -1)
    : [];

  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [
      ...conversationHistory,
      { role: "user", content: message }
    ],
  });

  res.json({ reply: response.content[0].text });
};