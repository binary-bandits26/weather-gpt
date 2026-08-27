import express from "express";
import { groqModel } from "./controllers/llmProvider.js";
import { systemPrompt, userQuery } from "./promptTemplates/latLongPrompt.js";

const app = express();

app.get("/home", async (req, res) => {
  const ans = await groqModel(userQuery, systemPrompt);
  res.json({ msg: ans });
});

app.listen(8000, () => {
  console.log("server started at part 8000");
});
