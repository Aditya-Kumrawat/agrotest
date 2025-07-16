
import { Router } from 'express'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../client/lib/firebase'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Get user profile from Firestore
    const userDoc = await getDoc(doc(db, 'profiles', firebaseUser.uid));
    if (!userDoc.exists()) {
      return res.status(400).json({ error: 'User profile not found' });
    }

    const userData = userDoc.data();
    
    // Generate JWT
    const token = jwt.sign(
      { id: firebaseUser.uid, email: firebaseUser.email, name: userData.name }, 
      process.env.JWT_SECRET || 'secret', 
      { expiresIn: '7d' }
    );

    res.json({ 
      token, 
      user: { 
        id: firebaseUser.uid, 
        email: firebaseUser.email, 
        name: userData.name, 
        phone: userData.phone 
      } 
    });
  } catch (error: any) {
    console.error('Signin error:', error);
    res.status(400).json({ error: error.message || 'Invalid credentials' });
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

    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Store user profile in Firestore
    await setDoc(doc(db, 'profiles', firebaseUser.uid), {
      name,
      email,
      phone: phone || null,
      createdAt: new Date()
    });

    console.log('User signup successful:', { id: firebaseUser.uid, email });
    return res.json({ message: 'Signup successful' })
  } catch (error: any) {
    console.error('Signup error:', error, error.stack);
    if (error.code === 'auth/email-already-in-use') {
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: error.message || 'Server error' })
  }
})

// Signout (client should just delete token)
router.post('/signout', (req, res) => {
  res.json({ message: 'Signed out successfully (client should delete token)' })
})

export default router;
