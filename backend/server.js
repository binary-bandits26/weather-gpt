import express from "express";
import chat from "./routes/chat.js"

const app = express();

app.use(express.json())
app.use("/api/v1", chat)


app.listen(8000, () => {
  console.log("server started at part 8000");
});
