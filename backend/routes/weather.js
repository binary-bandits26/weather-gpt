
import { Router } from "express";
import { weatherProvider } from "../controllers/weatherProvider.js";

const router = Router();

router.post("/weather", async (req, res) => {
  try {
    const { lat, long} = req.body;
    const weatherData = await weatherProvider(lat, long);
    return res.send(weatherData);
  } catch (error) {
    throw new Error(error);
  }
});

export default router;
