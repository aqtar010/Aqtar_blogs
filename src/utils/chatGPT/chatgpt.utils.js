import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: import.meta.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);
export const gptRequestHandler = async (userPrompt) => {
console.log(userPrompt);
  try {
    delete configuration.baseOptions.headers['User-Agent'];
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `100 words blog on the ${userPrompt}`,
      max_tokens:100
    });
    console.log(response.data.choices[0].text);
  } catch (err) {
    console.log(err);
  }
};
