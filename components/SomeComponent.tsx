import React, { useEffect, useState } from 'react';
import { getResponse } from '../lib/ollama';

const SomeComponent = () => {
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getResponse('Your input here');
      setResponse(result);
    };

    fetchData();
  }, []);

  return <div>{response}</div>;
};

export default SomeComponent;