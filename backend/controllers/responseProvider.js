import { responsePrompt } from "../promptTemplates/responsePrompt.js";
import { groqModel } from "./llmProvider.js";
import { locationProvider } from "./locationProvider.js";
import { weatherProvider } from "./weatherProvider.js";

export async function responseProvider(userQuery) {
  const { lat, long } = await locationProvider(userQuery);

  const weatherReport = await weatherProvider(lat, long);

  const userPormpt = `
    ## json format weather report
    ${JSON.stringify(weatherReport)}

    ## user
    ${userQuery}

    ## example-1
    - user: can i go to walk for bit durg
    - process: fetch cordinates for bit durg which is in chattisgarh than react the report and based on that give simple answer like
        if weather is sunny -> yes it good to me and for walking and more context around the report and all the response in simple language

    ## rules
    1. response should be under 40 to 50 words until user explicitly ask for more
    2. try to give your answer like good response



    ## bad response example
    It’s overcast but dry, around 26 °C, good visibility and only a gentle breeze.
     So a long drive around Raipur should be fine—just keep an eye on 
    the humidity and stay alert on the road. Enjoy the ride!

    ## good response example
    It's cloudy but not raining, and the temperature is around 26°C. The visibility
     is good and the wind is light, so it's a good day for a long drive around Raipur. 
     Just watch out for humidity and drive safely. Enjoy your ride!

    `;

  const aiResponse = await groqModel(userPormpt, responsePrompt, 0.7);
  return { aiResponse, weatherReport };
}

const userQuery = `how it the weather around bhilai`

const result = await responseProvider(userQuery);

console.log(`\n\nuser: ${userQuery}`);
console.log(`\n\nai: ${result.aiResponse}`);
console.log(`\n\n\n\n\nweatherJSON: ${JSON.stringify(result.weatherReport)}\n\n`);
