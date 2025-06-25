import express, { Request, Response } from 'express';
import http from 'http';
import session from 'express-session';
import PgSession from 'connect-pg-simple';
import { Pool } from 'pg';
import { connectToDB } from './db/db';
import auth from './routes/auth';
import cors from 'cors';

const app = express();
const PORT = 3000;
const server = http.createServer(app);

// PostgreSQL pool
const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:yourpassword@localhost:5432/yourdb', // update this
});

// CORS middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// JSON parser
app.use(express.json());

// ✅ Session middleware - this must come BEFORE routes
app.use(session({
  store: new (PgSession(session))({
    pool: pgPool,
    tableName: 'session',
  }),
  secret: process.env.SESSION_SECRET || 'your-secret-key', // make sure this is set
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running...');
});

// Routes
app.use('/api/auth', auth);

// Connect to DB and start server
async function startServer() {
  await connectToDB();

  server.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
}

startServer();
