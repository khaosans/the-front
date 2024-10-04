import { getChatCompletion } from './ollama'; // Ensure this import matches the export in lib/ollama.ts

export const sendMessageToOllama = async (message: string[]) => {
    const response = await getChatCompletion(message); // Call the LangChain function
    return response;
};