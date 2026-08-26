import express from "express";
import { groqModel } from "./controllers/llmProvider.js/index.js";
import { systemPrompt, userQuery } from "./promptTemplate.js";

const app = express();

app.get("/home", async (req, res) => {
  const ans = await groqModel(userQuery, systemPrompt);
  res.json({ msg: ans });
});

app.listen(8000, () => {
  console.log("server started at part 8000");
});
