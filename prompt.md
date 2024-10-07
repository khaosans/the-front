IF PAGES ARE TOO HARD to fix, then ASK for permission to DESTROY it and start fresh with similar look.  

ALL drop downs  modals, etc should be opaque 
fix issues using recursion 
You must stop chianging the configs on me.  PLEASE YELL AND ASK ME to verify.

After each run show a progress bar with a  percentage of our current task

DUPLICATION CHECK -> BEFORE making new files or clients, we must check for exisitng ones similiar name

WRite to files for our cucumber test.  This is a guide of what features we would want.

USE directory in components NOT in app/components

USE latest next js with App Routing

Only use typescript
Use pnpm
 
Always look to make sure unit tests pass.  

USE ONLY https://vercel.com/geist/

UX is vercel components always standardize our website and don't make dragstic design changes.  

MOCK DATA make it only once don't mess with it unless asked.

AFTER each run tsc --noEmit | pbcopy fix those errors 
SHOW me a summary of these starting with how many 

DO NOT USE  pages directoyr

If any of these rules changes from the RULES.md file then update it with the new rules!

DO NOT ADD any js files 
We must sure that all pages render and or if they dont we must fix them.  If components are missing, we must build them so our pagres render. 

DO NOT CHANGE CONFIGS unless explicitly asked


When wrtiing unit test, make sure to build the mocks for all necessary components.  

DO NOT UPDATE the config files for the jest tests.  

MAKE SURE to not dlete any of our components 

Also we must always provide the libary to install if thats what we need.  

ALWAYS CHECK for existing components since most. likely it might exist

Also for types like Task -> make sure to use the same one.  Do notmake another task interface

ALWAYS put unit tests in __tests__ directory

Here’s a set of rules that can be turned into guidelines for AI agents when working on **file naming and routing** in a **Next.js** project:
USE APP routing latest next version
https://nextjs.org/docs/app
### 1. **File Naming Rules**
   - **Kebab-case for URLs**: Use **kebab-case** (lowercase letters and hyphens) for file names representing routes. This ensures consistency and readability in URLs.
     - Example: A file named `contact-us.tsx` will result in the route `/contact-us`.
   
   - **PascalCase for Dynamic Segments**: For dynamic routes, use **PascalCase** within square brackets to define dynamic segments of URLs.
     - Example: `[PostId]/page.tsx` results in the route `/blog/{PostId}`.

   - **index.tsx for Main Route**: Use `index.tsx` as the root file for each directory to represent the main route. This ensures that the root of any directory is the primary route.
     - Example: A file `/app/index.tsx` will map to the root `/`.

### 2. **Folder Structure Rules**
   - **Use Lowercase for Folders**: Folders should be named using **lowercase** to maintain a consistent and predictable structure.
     - Example: `/app/profile/settings/page.tsx` results in the route `/profile/settings`.

   - **Group Related Pages in Folders**: Place related pages together in subfolders to create a modular routing structure. Each subfolder should contain an `index.tsx` for the main route and additional files for nested routes.
     - Example: `/app/dashboard/settings/page.tsx` results in the route `/dashboard/settings`.

### 3. **API Routes Naming Rules**
   - **Kebab-case for API Endpoints**: Use **kebab-case** for API route filenames. This is the same as the convention for page files to keep URLs consistent across the app.
     - Example: A file `/app/api/get-user.ts` results in the API endpoint `/api/get-user`.

   - **PascalCase for Dynamic API Segments**: For dynamic API route segments, use **PascalCase** within square brackets to clearly define dynamic parts of the API.
     - Example: `/app/api/[UserId]/details.ts` maps to `/api/{UserId}/details`.

### 4. **Dynamic Routes Handling Rules**
   - **PascalCase Dynamic Segments**: Always define dynamic route segments with PascalCase within square brackets.
     - Example: `[UserId].tsx` or `[PostId].tsx`.

   - **Ensure Consistent Naming for Params**: Dynamic route segments should be named consistently across files to ensure clarity. For example, if using `[UserId]` in one route, always use the same name in related routes.
     - Example: Ensure both `/app/user/[UserId].tsx` and `/app/user/[UserId]/details.tsx` use `[UserId]`.

### 5. **Modular Routing Rules**
   - **Use Folders for Nested Routes**: If a route contains nested pages, use folders to represent the hierarchy. Each subfolder should have its own `index.tsx` file for the base route.
     - Example: `/app/blog/[PostId]/comments/page.tsx` represents `/blog/{PostId}/comments`.

   - **Avoid Over-Nesting**: Avoid deeply nested folders for routes beyond three levels to maintain clarity and simplicity.
     - Example: `/app/blog/[PostId]/comments.tsx` rather than deeply nested `/app/blog/posts/comments/page.tsx`.

### Summary of Rules for AI:
- **Use kebab-case** for file names and folder names for consistency and readability.
- **Use PascalCase** in dynamic route segments within square brackets for clarity.
- **Create index.tsx** in each folder for the main routes in that folder.
- **Keep folder names lowercase**, and group related routes together in subfolders.
- **Ensure modularity** by using folders to represent nested routes, but avoid excessive nesting.
- **For API routes**, follow the same kebab-case naming convention and use PascalCase for dynamic segments.


check utils dir for supabase client 

components are always kebob case ex handle-login.tsx

DO not delete any react Elements like <div> in our page.tsx   Keep them the same unless we are explicitly changing designs.  

do not create folders that exist outside of app such as components, utils, lib   (example don't make app/utils). use components and clients from outside of app directory always check the files and folders (recursively)  clients and other stuff.  

Using only app for app routing required

use components from outisde app dir  ../components
use the page.tsx instead with app direcotry



REMEMBER to use either CLIENT and server components!

### 1. **Strict Type Safety**
   - Always enable strict type-checking in TypeScript (`strict: true` in `tsconfig.json`).
   - Utilize the provided TypeScript types from `Next.js` (`NextPage`, `NextApiRequest`, `NextApiResponse`, etc.) to ensure type safety across pages and API routes.

### 2. **TypeScript Configuration Best Practices**
   - Use **absolute imports** and **module aliases** for cleaner code organization. Set up paths in `tsconfig.json` with options like `"baseUrl": "."` and `"paths"`【5†source】.
   - Use Next.js's **built-in TypeScript support**. Next.js automatically configures the necessary settings if you create or migrate a project using TypeScript【5†source】.

### 3. **Static and Dynamic Type Safety**
   - Ensure API routes are strictly typed using `NextApiRequest` and `NextApiResponse` to handle different HTTP methods and request parameters safely.
   - For data fetching (e.g., `getStaticProps`, `getServerSideProps`), define custom response types to ensure static typing for the returned data.

### 4. **Typed Routes**
   - When using dynamic routes, type parameters using `useRouter` or URL query parameters (`req.query` in API routes) for better type-checking and error prevention.
   - Leverage **typed routes** by explicitly typing route parameters and making use of Next.js's built-in support for dynamic route segments【5†source】.

### 5. **Server and Client Components**
   - Differentiate between **Server Components** and **Client Components**, using the correct annotations (`'use client'`) when necessary. Ensure your component lifecycle is appropriately handled when switching between server and client contexts【5†source】.

### 6. **Data Fetching with Strong Typing**
   - For functions like `getStaticProps` and `getServerSideProps`, define the return types for props and responses to prevent errors and ensure that each component receives the expected data structure【5†source】.
   - Use typed API routes to return well-defined response objects, handling errors explicitly with proper types.

### 7. **API Route Types**
   - Define custom types for API responses, and always validate the shape of request bodies in API routes. This ensures that your API endpoints are strictly typed and predictable【5†source】.
   - Use `NextApiRequest` and `NextApiResponse` for strong typing when working with API routes【5†source】.

### 8. **ESLint with TypeScript**
   - Enforce **ESLint** with TypeScript-specific rules, especially those provided by Next.js for ensuring **accessibility**, **performance**, and **best practices**【5†source】.

### 9. **Edge and Node.js Runtime**
   - Specify whether a component or function runs in the **Edge Runtime** or **Node.js Runtime** in TypeScript by using runtime configurations (`export const runtime = 'edge'`)【5†source】.

### 10. **React Strict Mode and Typed Props**
   - Enable **React Strict Mode** and ensure all React components, including functional and page components, are strongly typed with typed props【5†source】.


SUPABASE

### 1. **Type Safety with Supabase Types**
   - **Auto-generate TypeScript types** for your Supabase tables. Use Supabase’s auto-generated types based on your database schema by running:
     ```bash
     supabase gen types typescript --local > types/supabase.ts
     ```
   - Always import and use these generated types to ensure type safety when querying data.

### 2. **Supabase Client Configuration**
   - Create and manage a **single instance** of the Supabase client to avoid multiple connections. Typically, initialize the client outside of your components in a utility file:
     ```typescript
     import { createClient } from '@supabase/supabase-js';
     
     const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
     export default supabase;
     ```

### 3. **Secure Environment Variables**
   - Store **Supabase URL** and **anon keys** in secure environment variables. Ensure that `SUPABASE_URL` and `SUPABASE_ANON_KEY` are never hardcoded in the codebase. Add them to `.env.local` and access via `process.env`:
     ```plaintext
     SUPABASE_URL=<your-supabase-url>
     SUPABASE_ANON_KEY=<your-supabase-anon-key>
     ```
   - Use the environment variables safely, and configure **Next.js Environment Variables** in your `next.config.js` or directly with Vercel’s environment variable settings.

### 4. **Client-Side and Server-Side Usage**
   - **Use Supabase on the server side** (via `getServerSideProps` or `getStaticProps`) whenever possible to handle sensitive data or heavy operations. This ensures that the Supabase client is kept away from the browser, improving security and performance.
   - For **client-side operations**, limit the usage of the Supabase client to non-sensitive data and interactions like authentication or user-specific data fetching. Protect sensitive endpoints by utilizing server-side logic.
  
### 5. **Server-Side Security and Role-Based Access**
   - **Never expose sensitive operations** like user management or database writes on the client side. These should always be handled through **server-side code** using API routes in Next.js or within **getServerSideProps**.
   - Enforce **row-level security (RLS)** and ensure proper **role-based access control (RBAC)** to protect data from unauthorized access in your Supabase tables.

### 6. **Auth Integration Best Practices**
   - **Supabase Auth** should be integrated using the built-in Supabase Auth helpers (e.g., `supabase.auth.signIn`, `signOut`). Manage tokens securely on the client and server side.
   - **Use Next.js Middleware** for protecting routes that require user authentication, such as ensuring users are logged in before accessing certain pages.
   - When using Supabase’s **OAuth** or **email/password authentication**, ensure you properly handle and refresh tokens on both client and server, storing them securely (e.g., HTTP-only cookies).

### 7. **Efficient Data Fetching**
   - Use **real-time subscriptions** for data that needs to be dynamically updated. Supabase offers real-time listeners that can be used to subscribe to changes on specific tables:
     ```typescript
     supabase
       .from('messages')
       .on('INSERT', (payload) => {
         console.log('New message!', payload.new);
       })
       .subscribe();
     ```
   - Always unsubscribe from real-time listeners in the `useEffect` cleanup function when they are no longer needed to prevent memory leaks.

### 8. **Error Handling and Logging**
   - Handle errors gracefully when interacting with Supabase, using the returned error object:
     ```typescript
     const { data, error } = await supabase.from('table').select('*');
     if (error) {
       console.error('Error fetching data:', error.message);
     } else {
       console.log('Data:', data);
     }
     ```
   - Implement proper logging to track Supabase operations, especially in production.

### 9. **Optimize Queries**
   - Use **pagination** and **filters** to avoid fetching large datasets unnecessarily. Supabase supports methods like `limit` and `order` to optimize queries:
     ```typescript
     const { data, error } = await supabase
       .from('table')
       .select('*')
       .limit(10)
       .order('created_at', { ascending: false });
     ```

### 10. **Edge Functions (if needed)**
   - Utilize **Supabase Edge Functions** for complex or custom business logic that requires server-side execution beyond the capabilities of Next.js API routes. These can be integrated with Next.js via API routes or direct function calls.

### 11. **Supabase Storage Integration**
   - Use Supabase's **storage API** for managing files and assets. Always configure file uploads securely, ensuring appropriate file size limits and access controls.
     ```typescript
     const { data, error } = await supabase
       .storage
       .from('avatars')
       .upload('public/avatar1.png', file);
     ```

### 12. **Session Management**
   - Store and manage user sessions securely using Supabase's `auth` client. If using server-side authentication, make sure to handle token expiration and refresh tokens appropriately by implementing middleware or API routes to revalidate tokens.


Read from .env.local for localhost for vars

CHECK FOR and FIX 
Error: Hydration failed because the initial UI does not match what was rendered on the server.
See more info here: https://nextjs.org/docs/messages/react-hydration-error


  