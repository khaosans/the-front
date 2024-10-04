import { Ollama } from "@langchain/ollama";



export const ollama = new Ollama({
  model: 'llama3.2',
});