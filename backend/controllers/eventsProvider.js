import { eventSystemPrompt } from "../promptTemplates/eventsPrompt.js";
import { groqModel } from "./llmProvider.js"
import { responseProvider } from "./responseProvider.js";

export async function eventsProvider(user){

    const report = (await responseProvider(user)).weatherReport
    const llm = await groqModel(JSON.stringify(report), eventSystemPrompt, 0.9);
    const ans = llm.split("#")
    const dos = ans[0]
    const donts = ans[1]
    return {dos, donts} 
}

// const res = await eventsProvider("bhilai nehru nagar")
// console.log(res.dos, res.donts)
