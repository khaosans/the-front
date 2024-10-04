import { getChatCompletion } from '@/lib/ollama';
import { createOllama } from 'ollama-ai-provider';

jest.mock('ollama-ai-provider');

describe('getChatCompletion', () => {
    it('should return chat completion response', async () => {
        const mockResponse = { text: 'Hello, how can I help you?' };
        (createOllama as jest.Mock).mockReturnValue({
            chatModel: {
                complete: jest.fn().mockResolvedValue(mockResponse),
            },
        });

        const response = await getChatCompletion('Hello');
        expect(response).toEqual(mockResponse);
    });
});