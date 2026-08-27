import {groqModel} from "./llmProvider.js"
import { systemPrompt } from "../promptTemplates/latLongPrompt.js"

export async function locationProvider(userQuery){
    const ans = await groqModel(userQuery, systemPrompt, 0.1) 
    const location = ans.split(" ")
    const lat = location[0]
    const long = location[1]
    return {lat, long}
}

