import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const BlogPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  console.log('post', post);
  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const docRef = doc(db, 'blogPosts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          console.log('No such document!');
        }
      };

      fetchPost();
    }
  }, [id]);

  if (!post) {
    return <Typography variant="h5">Post not found</Typography>;
  }

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        {post.header}
      </Typography>
      <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: post.body }} />
    </Container>
  );
};

export default BlogPost;
