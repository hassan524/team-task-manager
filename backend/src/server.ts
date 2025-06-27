import express, { Request, Response } from 'express';
import http from 'http';
import session from 'express-session';
import PgSession from 'connect-pg-simple';
import { Pool } from 'pg';
import { connectToDB } from './db/db';
import auth from './routes/auth';
import teams from "./routes/teams"
import tasks from "./routes/tasks"
import cors from 'cors';

const app = express();
const PORT = 3000;
const server = http.createServer(app);

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:yourpassword@localhost:5432/yourdb',
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use(session({
  store: new (PgSession(session))({
    pool: pgPool,
    tableName: 'session',
  }),
  secret: process.env.SESSION_SECRET || 'your-secret-key', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 
  }
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running yo...');
});

app.use('/api/auth', auth);
app.use('/api/teams', teams);
app.use('/api/tasks', tasks);


async function startServer() {
  await connectToDB();

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();
