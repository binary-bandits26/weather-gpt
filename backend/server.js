import express from "express";
import chat from "./routes/chat.js";
import event from "./routes/events.js";

const app = express();

app.use(express.json());
app.use("/api/v1", chat);
app.use("/api/v1", event);

app.listen(8000, () => {
  console.log("server started at part 8000");
});
