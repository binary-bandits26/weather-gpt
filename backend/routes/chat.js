import { Router } from "express";
// import z from "zod"
import { responseProvider } from "../controllers/responseProvider.js";

const router = Router();

// const queryParser = z.object({
//     userQuery: z.string
// })

router.post("/chat", async (req, res) => {
  const { userQuery } = req.body;
//   const parsedReq = z.safeParse(queryParser, userQuery)
//   if(!parsedReq){
//     throw new Error({error: "invalid user query"})
//   }
  try {
  const llmRes = await responseProvider(userQuery)
  return res.json({ai: llmRes.aiResponse, report: llmRes.weatherReport})
  } catch (error) {
    throw new Error(error)  
  }
});

export default router