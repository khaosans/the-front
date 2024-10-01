const logger = {
  log: (message: string) => {
    if (typeof window === 'undefined') {
      // Server-side logging
      console.log(message);
    } else {
      // Client-side logging
      console.log(message);
    }
  },
  error: (message: string) => {
    if (typeof window === 'undefined') {
      console.error(message);
    } else {
      console.error(message);
    }
  },
  warn: (message: string) => {
    if (typeof window === 'undefined') {
      console.warn(message);
    } else {
      console.warn(message);
    }
  },
  info: (message: string) => {
    if (typeof window === 'undefined') {
      console.info(message);
    } else {
      console.info(message);
    }
  },
};

export default logger;