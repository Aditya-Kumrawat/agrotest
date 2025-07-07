
import { Router } from 'express'
import { supabase } from '../config/supabase'
import { authenticateUser, AuthenticatedRequest } from '../middleware/auth'

const router = Router()

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const { data: posts, error } = await supabase
      .from('community_posts')
      .select(`
        *,
        profiles(name),
        comments:community_comments(
          id,
          content,
          created_at,
          profiles(name)
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) {
      return res.status(400).json({ error: error.message })
    }
    
    res.json({ posts })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Create new post
router.post('/posts', authenticateUser, async (req: AuthenticatedRequest, res) => {
  try {
    const { title, content, category } = req.body
    
    const { data: post, error } = await supabase
      .from('community_posts')
      .insert({
        user_id: req.user.id,
        title,
        content,
        category
      })
      .select(`
        *,
        profiles(name)
      `)
      .single()
    
    if (error) {
      return res.status(400).json({ error: error.message })
    }
    
    res.json({ post })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Add comment to post
router.post('/posts/:id/comments', authenticateUser, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params
    const { content } = req.body
    
    const { data: comment, error } = await supabase
      .from('community_comments')
      .insert({
        post_id: id,
        user_id: req.user.id,
        content
      })
      .select(`
        *,
        profiles(name)
      `)
      .single()
    
    if (error) {
      return res.status(400).json({ error: error.message })
    }
    
    res.json({ comment })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
