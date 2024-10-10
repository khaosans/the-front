import kvClient from './kvClient';

export const setSession = async (sessionId: string, data: any, ttl: number = 3600) => {
    await kvClient.set(sessionId, data, ttl);
};

export const getSession = async <T>(sessionId: string): Promise<T | null> => {
    return await kvClient.get<T>(sessionId);
};

export const deleteSession = async (sessionId: string) => {
    await kvClient.delete(sessionId);
};