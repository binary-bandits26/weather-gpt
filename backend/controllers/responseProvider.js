import { responsePrompt } from "../promptTemplates/responsePrompt.js";
import { groqModel } from "./llmProvider.js";
import { locationProvider } from "./locationProvider.js";
import { weatherProvider } from "./weatherProvider.js";

function cordinatesFn(ans){
  ans.split(" ")
  const lat = ans[0]
  const long = ans[1]
  return {lat,long} 
}

export async function responseProvider(userQuery) {
    const cordinates = await locationProvider(userQuery)
    const numCordinates = cordinatesFn(cordinates)

  const weatherReport = await weatherProvider(numCordinates.lat, numCordinates.long)

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
    `;
  

  const aiResponse = await groqModel(userPormpt, responsePrompt, 0.6);
  return aiResponse;
}


// const result = await responseProvider();

// console.log(`\n\nuser: ${userQuery}`);
// console.log(`\n\nai: ${result}`);
// console.log(`\n\n\n\n\nweatherJSON: ${JSON.stringify(weatherReport)}\n\n`);
