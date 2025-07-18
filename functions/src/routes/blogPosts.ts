// functions/src/routes/blogPosts.ts
import { Router, Request, Response } from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import { authenticate } from '../middleware';

const router = Router();

// Helper to check for admin/super roles
const isAdminOrSuper = (role: string | undefined): boolean => {
  return role === 'admin' || role === 'super';
};

/**
 * POST /blog-posts
 * Creates a new blog post.
 * Accessible by: Admin and Super users only.
 */
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const db = getFirestore();

    const user = req.user; // User object attached by authenticate
    if (!isAdminOrSuper(user?.role)) {
      return res
        .status(403)
        .json({ success: false, error: 'Forbidden: Insufficient permissions to create a blog post.' });
    }

    const {
      title,
      content,
      images, // Array of image URLs
      categories, // Array of strings
      tags, // Array of strings
      status, // e.g., 'draft', 'published', 'archived'
      publishedAt, // Optional: specific publication date
      ...otherData // Catch any other unexpected fields
    } = req.body;

    // Basic server-side validation
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ success: false, error: 'Blog post title is required.' });
    }
    if (!content || typeof content !== 'string' || content.trim() === '') {
      return res.status(400).json({ success: false, error: 'Blog post content is required.' });
    }
    // Further validation for images, categories, tags can be added (e.g., must be arrays)

    const newBlogPost = {
      title: title.trim(),
      content: content.trim(),
      images: Array.isArray(images) ? images : [],
      categories: Array.isArray(categories) ? categories.map((cat: string) => cat.trim()) : [],
      tags: Array.isArray(tags) ? tags.map((tag: string) => tag.trim()) : [],
      status: typeof status === 'string' && ['draft', 'published', 'archived'].includes(status) ? status : 'draft', // Default to 'draft'
      authorId: user?.uid,
      authorName: user?.displayName || user?.email || 'Unknown Author', // Use display name, email, or fallback
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt:
        status === 'published' && publishedAt
          ? new Date(publishedAt).toISOString()
          : status === 'published'
            ? new Date().toISOString()
            : null,
      // Ensure no arbitrary fields are added unless explicitly allowed
      ...otherData, // Filter this in production if you don't want arbitrary fields
    };

    const docRef = await db.collection('blogPosts').add(newBlogPost);
    return res.status(201).json({ success: true, id: docRef.id, message: 'Blog post created successfully.' });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return res.status(500).json({ success: false, error: 'Internal server error while creating blog post.' });
  }
});

/**
 * GET /blog-posts
 * Fetches all blog posts.
 * Accessible by: Public (no authentication required).
 * Can be filtered by query parameters (e.g., status='published').
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const db = getFirestore();
    const { status, limit, offset, category, tag, sortField, sortOrder } = req.query;

    let query: FirebaseFirestore.Query = db.collection('blogPosts');

    // Filter by status (e.g., only show 'published' for public)
    if (typeof status === 'string' && status.trim() !== '') {
      query = query.where('status', '==', status);
    } else {
      // For public access, typically only show published posts by default
      // If this route is exclusively for admin panel, you might remove this default
      query = query.where('status', '==', 'published');
    }

    // Filter by category
    if (typeof category === 'string' && category.trim() !== '') {
      query = query.where('categories', 'array-contains', category);
    }

    // Filter by tag
    if (typeof tag === 'string' && tag.trim() !== '') {
      query = query.where('tags', 'array-contains', tag);
    }

    // Apply sorting
    const orderByField = typeof sortField === 'string' && sortField.trim() !== '' ? sortField : 'publishedAt';
    const orderByDirection = sortOrder === 'asc' ? 'asc' : 'desc';
    query = query.orderBy(orderByField, orderByDirection);

    // Apply pagination
    if (typeof offset === 'string' && !isNaN(parseInt(offset, 10))) {
      query = query.offset(parseInt(offset, 10));
    }
    if (typeof limit === 'string' && !isNaN(parseInt(limit, 10))) {
      query = query.limit(parseInt(limit, 10));
    }

    const querySnapshot = await query.get();
    const blogPosts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return res.status(200).json({ success: true, data: blogPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return res.status(500).json({ success: false, error: 'Internal server error while fetching blog posts.' });
  }
});

/**
 * GET /blog-posts/:id
 * Fetches a single blog post by its ID.
 * Accessible by: Public (if published) or any authenticated user.
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const db = getFirestore();
    const blogPostId = req.params.id;
    const docRef = db.collection('blogPosts').doc(blogPostId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'Blog post not found.' });
    }

    const blogPostData = doc.data();

    // For public access, ensure the post is 'published'
    // If an authenticated user (e.g., admin) needs to preview drafts,
    // you'd add authenticate and specific logic here.
    if (blogPostData?.status !== 'published') {
      // If authentication is not present or user is not admin/super, deny access to non-published posts
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ success: false, error: 'Forbidden: This blog post is not published.' });
      }
      // If there's an auth token, you could verify it here and allow if admin/super
      // This would require explicitly running authenticate for this specific case or custom logic
      // For simplicity, we're assuming this is for public access for non-published posts unless explicitly authenticated by a subsequent middleware
    }

    return res.status(200).json({ success: true, data: { id: doc.id, ...blogPostData } });
  } catch (error) {
    console.error('Error fetching single blog post:', error);
    return res.status(500).json({ success: false, error: 'Internal server error while fetching blog post.' });
  }
});

/**
 * PUT /blog-posts/:id
 * Updates an existing blog post.
 * Accessible by: Admin and Super users only.
 */
router.put('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const db = getFirestore();
    const user = req.user;
    const blogPostId = req.params.id;

    // Check for necessary permissions
    if (!isAdminOrSuper(user?.role)) {
      return res
        .status(403)
        .json({ success: false, error: 'Forbidden: Insufficient permissions to update a blog post.' });
    }

    const docRef = db.collection('blogPosts').doc(blogPostId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'Blog post not found.' });
    }

    const currentData = doc.data();
    const updates = {
      ...req.body, // The fields to update
      updatedAt: new Date().toISOString(), // Always update 'updatedAt'
    };

    // Handle specific field logic
    if (updates.status === 'published' && currentData?.status !== 'published') {
      updates.publishedAt = updates.publishedAt || new Date().toISOString(); // Set publish date if status changed to published
    } else if (updates.status !== 'published' && currentData?.status === 'published') {
      updates.publishedAt = null; // Clear publish date if status changed from published
    }

    // Clean up arrays if they are provided empty
    if (updates.images && !Array.isArray(updates.images)) updates.images = [];
    if (updates.categories && !Array.isArray(updates.categories)) updates.categories = [];
    if (updates.tags && !Array.isArray(updates.tags)) updates.tags = [];

    // Ensure no arbitrary fields are added unless explicitly allowed
    // You might want to filter `updates` to only allow specific fields to be changed by API
    delete updates.authorId; // Prevent changing author via PUT
    delete updates.createdAt; // Prevent changing creation date via PUT

    await docRef.update(updates);
    return res.status(200).json({ success: true, message: 'Blog post updated successfully.' });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return res.status(500).json({ success: false, error: 'Internal server error while updating blog post.' });
  }
});

/**
 * DELETE /blog-posts/:id
 * Deletes a blog post by its ID.
 * Accessible by: Admin and Super users only.
 */
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const db = getFirestore();
    const user = req.user;
    const blogPostId = req.params.id;

    // Check for necessary permissions
    if (!isAdminOrSuper(user?.role)) {
      return res
        .status(403)
        .json({ success: false, error: 'Forbidden: Insufficient permissions to delete a blog post.' });
    }

    const docRef = db.collection('blogPosts').doc(blogPostId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'Blog post not found.' });
    }

    await docRef.delete();
    return res.status(200).json({ success: true, message: 'Blog post deleted successfully.' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return res.status(500).json({ success: false, error: 'Internal server error while deleting blog post.' });
  }
});

export default router;
