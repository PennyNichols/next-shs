'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Typography } from '@mui/material';
import { db } from '@/lib/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

// add loading skeleton

const BlogPost = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const postId = Array.isArray(id) ? id[0] : id;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (typeof postId === 'string' && postId) {
      const fetchPost = async () => {
        const docRef = doc(db, 'blogPosts', postId as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          router.push('/404');
        }
      };

      fetchPost();
    }
  }, [postId]);

  return (
    <Container className="page-wrapper">
      <Typography variant="h2" gutterBottom>
        {post.header}
      </Typography>
      <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: post.body }} />
    </Container>
  );
};

export default BlogPost;
