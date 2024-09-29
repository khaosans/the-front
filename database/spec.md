## Database Connection
### PostgreSQL Connection Configuration
- Create and manage a single instance of the database client to avoid multiple connections. Initialize the client outside of your components in a utility file:
  ```typescript
  import { Client } from 'pg';

  const dbClient = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  });

  dbClient.connect()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

  export default dbClient;
  ```

### Secure Environment Variables
- Store database connection details in secure environment variables. Ensure that `DB_USER`, `DB_HOST`, `DB_NAME`, `DB_PASSWORD`, and `DB_PORT` are never hardcoded in the codebase. Add them to `.env.local` and access via `process.env`:
  ```plaintext
  DB_USER=<your-database-user>
  DB_HOST=<your-database-host>
  DB_NAME=<your-database-name>
  DB_PASSWORD=<your-database-password>
  DB_PORT=<your-database-port>
  ```

### Notes
- Ensure that the database client is properly closed when the application is terminated to avoid connection leaks.
- Use connection pooling for better performance in production environments.