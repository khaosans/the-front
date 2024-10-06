import { createMocks } from 'node-mocks-http';
import { POST as handler } from '../../app/api/ollama/route';

// Mock the Ollama API response
jest.mock('../../app/api/ollama/route', () => ({
  POST: jest.fn((req, res) => {
    res.status(200).json({ reply: 'Ollama received: Hello, Ollama!' });
  }),
}));

describe('Ollama API', () => {
  it('should return a response with the message', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { message: 'Hello, Ollama!' },
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.reply).toContain('Ollama received: Hello, Ollama!');
  });

  it('should handle missing message', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {},
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.reply).toContain('Ollama received: ');
  });


  it('should handle error in Ollama API', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { message: 'Hello, Ollama!' },
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.reply).toContain('Ollama received: Hello, Ollama!');

  });
});
