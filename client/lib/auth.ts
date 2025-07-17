import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseClient'; // make sure path is correct

// SIGN UP USER
export const signUpUser = async (
  email: string,
  password: string,
  name: string,
  phone?: string
): Promise<User> => {
  try {
    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Set display name in Firebase Auth profile
    await updateProfile(user, {
      displayName: name
    });

    // 3. Save user info in Firestore
    await setDoc(doc(db, 'profiles', user.uid), {
      name,
      email,
      phone: phone || null,
      createdAt: new Date()
    });

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// SIGN IN USER
export const signInUser = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    // 1. Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Get ID token
    const idToken = await user.getIdToken();

    // 3. Try to call backend API (optional - for additional user data)
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      });

      if (response.ok) {
        const data = await response.json();
        return { ...data, user };
      } else {
        // If backend fails, still return user data from Firebase
        console.warn('Backend signin failed, using Firebase auth only');
        return { user };
      }
    } catch (backendError) {
      // If backend is not available, still return user data from Firebase
      console.warn('Backend not available, using Firebase auth only');
      return { user };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// SIGN OUT USER
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
