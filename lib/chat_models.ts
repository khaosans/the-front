import { ollama } from './ollama';

export const sendMessageToOllama = async (message: string) => {
    const response = await ollama.invoke(message);
    return response;
};