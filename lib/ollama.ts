import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
  model: "llama3",  // Default value.
});

export const getChatCompletion = async (input : string[]) => {
    const result = await model.invoke(input);
    return result;
};


