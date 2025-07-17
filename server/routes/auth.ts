import { Router } from 'express';
import { adminAuth, adminDb } from '../config/firebaseAdmin';

const router = Router();

// Signin: verify ID token from frontend
router.post('/signin', async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ error: 'Missing ID token' });
    }
    // Verify the ID token using Admin SDK
    const decoded = await adminAuth.verifyIdToken(idToken);
    // Optionally fetch user profile from Firestore
    const userDoc = await adminDb.collection('profiles').doc(decoded.uid).get();
    if (!userDoc.exists) {
      return res.status(400).json({ error: 'User profile not found' });
    }
    const userData = userDoc.data();
    res.json({
      uid: decoded.uid,
      email: decoded.email,
      name: userData?.name,
      phone: userData?.phone
    });
  } catch (error: any) {
    console.error('Signin error:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create user with Firebase Admin SDK
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: name,
      phoneNumber: phone || undefined,
    });

    // Store user profile in Firestore
    await adminDb.collection('profiles').doc(userRecord.uid).set({
      name,
      email,
      phone: phone || null,
      createdAt: new Date(),
    });

    return res.json({ message: 'Signup successful' });
  } catch (error: any) {
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: error.message || 'Server error' });
  }
});

// Signout (client should just delete token)
router.post('/signout', (req, res) => {
  res.json({ message: 'Signed out successfully (client should delete token)' })
})

export default router;
