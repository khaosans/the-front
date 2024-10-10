import { kv } from '@vercel/kv';

class KVClient {
    private kvUrl: string;
    private kvToken: string;

    constructor() {
        this.kvUrl = process.env.UPSTASH_REDIS_URL || '';
        this.kvToken = process.env.UPSTASH_REDIS_TOKEN || '';

        if (!this.kvUrl || !this.kvToken) {
            throw new Error('KV service URL or token is not set in environment variables');
        }
    }

    async set(key: string, value: any, ttl: number = 3600): Promise<void> {
        await kv.set(key, JSON.stringify(value), { ex: ttl });
    }

    async get<T>(key: string): Promise<T | null> {
        const data = await kv.get(key);
        return data ? JSON.parse(data as string) : null;
    }

    async delete(key: string): Promise<void> {
        await kv.del(key);
    }
}

const kvClient = new KVClient();
export default kvClient;