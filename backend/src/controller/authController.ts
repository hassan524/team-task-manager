import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import client from '../db/db'; 

export const validateRegister = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

export const register = async (req: Request, res: Response) => {
  console.log('register controller hit');
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;
  console.log('got request baby', name)

  try {
    const userExists = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0)
      return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 12);

    await client.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [name, email, hashed]
    );

    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0)
      return res.status(400).json({ message: 'Invalid credentials' });

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    (req.session as any).userId = user.id;

    res.status(200).json({ message: 'Login successful', userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Logout failed' });

    res.clearCookie('connect.sid'); 
    res.status(200).json({ message: 'Logged out' });
  });
};

export const checkAuth = (req: Request, res: Response) => {
  if (req.session && (req.session as any).userId) {
    res.json({
      authenticated: true,
      user: (req.session as any).userId,
    });
  } else {
    res.json({
      authenticated: false,
    });
  }
};


export const getauth = async (req: Request, res: Response) => {
  if (req.session && (req.session as any).userId) {
    const userId = (req.session as any).userId;

    try {
      const result = await client.query(
        `SELECT id, name, email, created_at FROM users WHERE id = $1 ORDER BY created_at DESC`,
        [userId]
      );

      const user = result.rows[0];

      if (!user) {
        return res.status(404).json({ authenticated: false, message: "User not found" });
      }

      return res.json({
        authenticated: true,
        user,
      });
    } catch (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ authenticated: false, error: "Server error" });
    }
  } else {
    return res.json({
      authenticated: false,
    });
  }
};
