declare global {
  namespace NodeJS {
    interface ProcessEnv {
      UPSTASH_REDIS_URL: string;
      UPSTASH_REDIS_TOKEN: string;
      DEBANK_API_KEY: string;
    }
  }
}

export {};