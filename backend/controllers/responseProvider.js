import { userQuery } from "../promptTemplates/latLongPrompt.js";
import { responsePrompt } from "../promptTemplates/responsePrompt.js";
import { groqModel } from "./llmProvider.js";
import { weatherProvider, weatherReport } from "./weatherProvider.js";

export async function responseProvider() {
  const userPormpt = `
    ## json format weather report
    ${JSON.stringify(weatherReport)}

    ## user
    ${userQuery}

    ## example-1
    - user: can i go to walk for bit durg
    - process: fetch cordinates for bit durg which is in chattisgarh than react the report and based on that give simple answer like
        if weather is sunny -> yes it good to me and for walking and more context around the report and all the response in simple language
    `;
  const res = await groqModel(userPormpt, responsePrompt, 0.6);
  return res;
}

const result = await responseProvider();
console.log(result);
console.log(`\n\n${JSON.stringify(weatherReport)}\n\n`);
