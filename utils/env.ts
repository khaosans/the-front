const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

export const ENV = {
  SUPABASE_URL: getEnvVariable('SUPABASE_URL'),
  SUPABASE_ANON_KEY: getEnvVariable('SUPABASE_ANON_KEY'),
  // Add other environment variables here
};