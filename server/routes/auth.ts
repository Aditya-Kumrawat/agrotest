import { Router } from 'express'
import pool from '../config/mysql'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';

const router = Router()

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }
    // Find user
    const [rows] = await pool.query('SELECT * FROM profiles WHERE email = ?', [email]);
    const user = Array.isArray(rows) && rows.length > 0 ? (rows[0] as any) : null;
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    // Check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, phone: user.phone } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Signup
router.post('/signup', async (req, res) => {
  console.log('Received signup request');
  console.log('Signup route hit', req.body);
  try {
    const { email, password, name, phone } = req.body
    if (!email || !password || !name) {
      console.warn('Missing required fields:', { email, passwordPresent: !!password, name });
      return res.status(400).json({ error: 'Missing required fields' })
    }
    // Check if user exists
    const [existing] = await pool.query('SELECT id FROM profiles WHERE email = ?', [email])
    if (Array.isArray(existing) && existing.length > 0) {
      console.warn('Email already registered:', email);
      return res.status(400).json({ error: 'Email already registered' })
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    // Generate UUID for new user
    const id = uuidv4();
    // Insert user
    await pool.query(
      'INSERT INTO profiles (id, name, email, password, phone) VALUES (?, ?, ?, ?, ?)',
      [id, name, email, hashedPassword, phone || null]
    )
    console.log('User signup successful:', { id, email });
    return res.json({ message: 'Signup successful' })
  } catch (error) {
    console.error('Signup error:', error, (error instanceof Error ? error.stack : ''));
    res.status(500).json({ error: 'Server error' })
  }
})



// Signout (client should just delete token)
router.post('/signout', (req, res) => {
  res.json({ message: 'Signed out successfully (client should delete token)' })
})

export default router;
