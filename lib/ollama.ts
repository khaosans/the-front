import { createOllama } from 'ollama-ai-provider';

// Create an instance of Ollama with the desired model
export const ollama = createOllama({
    model: 'llama3.2', // Ensure this model is supported by the provider
});

export const getChatCompletion = async (input: string) => {
    const response = await ollama.chatModel.complete(input); // Ensure 'complete' is the correct method
    return response;
};