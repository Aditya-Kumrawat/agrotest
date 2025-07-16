
import { Router } from 'express'
import { collection, query, getDocs, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../client/lib/firebase'
import { authenticateUser, AuthenticatedRequest } from '../middleware/auth'

const router = Router()

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const postsQuery = query(collection(db, "community_posts"));
    const postsSnapshot = await getDocs(postsQuery);
    const posts = postsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({ posts })
  } catch (error) {
    console.error('Community posts error:', error);
    res.status(500).json({ error: 'Server error' })
  }
})

// Create new post
router.post('/posts', authenticateUser, async (req: AuthenticatedRequest, res) => {
  try {
    const { title, content, category } = req.body
    
    const docRef = await addDoc(collection(db, "community_posts"), {
      title,
      content,
      category,
      authorId: req.user.id,
      authorName: req.user.name,
      createdAt: new Date(),
      comments: []
    });

    const post = {
      id: docRef.id,
      title,
      content,
      category,
      authorId: req.user.id,
      authorName: req.user.name,
      createdAt: new Date(),
      comments: []
    };
    
    res.json({ post })
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Server error' })
  }
})

// Add comment to post
router.post('/posts/:id/comments', authenticateUser, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params
    const { content } = req.body
    
    const comment = {
      id: Date.now().toString(),
      content,
      authorId: req.user.id,
      authorName: req.user.name,
      createdAt: new Date()
    };

    await updateDoc(doc(db, "community_posts", id), {
      comments: arrayUnion(comment)
    });
    
    res.json({ comment })
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
