import { Router } from "express";
// import z from "zod"
import { eventsProvider } from "../controllers/eventsProvider.js";

const router = Router();

router.post("/events", async (req, res) => {
  try {
    const { userQuery } = req.body;
    const {dos, donts}= await eventsProvider(userQuery);
    return res.json({ do: dos, dont: donts});
  } catch (error) {
    throw new Error(error);
  }
});

export default router;
