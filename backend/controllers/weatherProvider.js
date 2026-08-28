import { locationProvider } from "./locationProvider.js";

export async function weatherProvider(lat, long) {
  const apiKey = process.env.OW_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather`;

  const weatherRes = await fetch(
    `${url}?lat=${lat}&lon=${long}&appid=${apiKey}`,
  );
  return weatherRes.json();
}



// const lat = await locationProvider();
// export const weatherReport = await weatherProvider(lat.lat, lat.long);
// // console.log(result);
