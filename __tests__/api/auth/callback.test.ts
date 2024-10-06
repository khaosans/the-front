import { createMocks } from 'node-mocks-http';
import { POST as handler } from '../../../app/api/auth/callback/route';
import { describe, it, expect, jest } from '@jest/globals';

describe('Auth Callback API', () => {
  it('should return success message with token', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { token: 'valid-token' },
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.message).toBe('Authentication successful');
    expect(data.token).toBe('valid-token');
  });

  it('should return error if token is missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {},
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data.error).toBe('Token is required');
  });

  
});