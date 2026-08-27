import Groq from "groq-sdk";
import "dotenv/config";

export async function groqModel(userQuery, systemPrompt, temp) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const llm = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      { role: "user", content: userQuery },
    ],
    model: "openai/gpt-oss-120b",
    temperature: temp,
    top_p: 0.5,
  });

  return llm.choices[0].message.content;
}

