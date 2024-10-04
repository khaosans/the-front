import { ollama } from './ollama'; // Ensure this import matches the export in lib/ollama.ts

export const sendMessageToOllama = async (message: string) => {
    // Check if 'invoke' is a valid method; if not, replace it with the correct method
    const response = await ollama.chatModel.complete(message); // Assuming 'complete' is the correct method
    return response;
};