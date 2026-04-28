const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({
  apiKey: "process.env.ANTHROPIC_API_KEY"
});

async function chat(message) {
  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
  });
  console.log(response.content[0].text);
}

chat("Hej, vad kan du hjälpa mig med?");