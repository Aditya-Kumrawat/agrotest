import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the root .env file
// Ensure this path is correct relative to the final build output location if different from source
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { createServer } from './app'; // Import the createServer function

const app = createServer(); // Create the Express app instance

const PORT = process.env.PORT || 5000;

// Optional: Add any middleware here that is specific to this entry point
// and not already in createServer (e.g. a global error handler if not already in app.ts)
// However, it's generally better to keep all app configuration within createServer.

// Example of a global error handler (if not already in app.ts)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err.stack || err.message || err);
  // Avoid sending stack trace to client in production
  const errorResponse = process.env.NODE_ENV === 'production'
    ? { error: 'Something went wrong!' }
    : { error: 'Something went wrong!', details: err.message, stack: err.stack };
  res.status(err.status || 500).json(errorResponse);
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Development server: Frontend should be accessible on its own dev server (e.g., http://localhost:4173)`);
  }
});