import { createOllama, OllamaProvider } from 'ollama-ai-provider';

// Create an instance of Ollama with the desired model
const ollama: OllamaProvider = createOllama({
  model: 'llama3.2', // Ensure this model is supported by the provider
});

// Example function to use Ollama for chat completion
export const getChatCompletion = async (input: string) => {
  // Call the appropriate method on the Ollama instance to get a chat completion response
  const response = await ollama.chatModel.complete(input); // Ensure 'complete' is the correct method
  return response;
};