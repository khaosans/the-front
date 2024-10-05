# Development Notes

## Linter Errors and TypeScript Issues

We've encountered several TypeScript and linter errors in our components, particularly with `ChatModal.tsx` and `TopBar.tsx`. These errors are primarily related to the usage of Lucide icons and Next.js `Link` components. Here's a summary of the issues and potential solutions:

### ChatModal.tsx

1. Lucide icons (`X`, `ChevronDown`, `Send`) cannot be used directly as JSX components.
   Solution: Use `React.createElement` or update the import statement.

   ```typescript
   import * as Icons from 'lucide-react';
   
   // Then use like this:
   <Icons.X size={24} />
   ```

### TopBar.tsx

1. Next.js `Link` component cannot be used directly as a JSX component.
   Solution: Wrap the `Link` component with an `a` tag or use the `legacyBehavior` prop.

   ```typescript
   <Link href="/" passHref legacyBehavior>
     <a className="text-white hover:underline">Home</a>
   </Link>
   ```

2. Lucide icons (`BarChart2`, `Settings`, `Bell`, `MessageCircle`) have the same issue as in ChatModal.tsx.
   Solution: Use the same approach as suggested for ChatModal.tsx.

3. `ChatModal` component usage is causing a TypeScript error.
   Solution: Ensure that the `ChatModal` component is correctly typed and imported.

## API Calls to Ollama

When making API calls to Ollama, refer to the official API documentation: https://github.com/ollama/ollama/blob/main/docs/api.md

Key points for API usage:

1. Fetching available models:
   Endpoint: `GET http://localhost:11434/api/tags`

2. Generating responses:
   Endpoint: `POST http://localhost:11434/api/generate`
   Body:
   ```json
   {
     "model": "selected_model_name",
     "prompt": "user_input",
     "stream": true
   }
   ```

3. Ensure proper error handling and response parsing for streamed responses.

4. Update the `fetchOllamaModels` and `handleSend` functions in `ChatModal.tsx` to use these endpoints correctly.

Remember to handle CORS issues if they arise, possibly by setting up a proxy server or adjusting your Next.js API routes to forward requests to Ollama.

## Next Steps

1. Resolve TypeScript and linter errors by implementing the suggested solutions.
2. Test the Ollama API integration thoroughly.
3. Implement error handling for API calls.
4. Consider adding a loading state while fetching models or generating responses.
5. Optimize the chat interface for better user experience.