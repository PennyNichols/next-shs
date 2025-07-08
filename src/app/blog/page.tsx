'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardActionArea, CardContent, Container, Typography, Box } from '@mui/material';
import { useFirebaseCollections } from '@/contexts/FirebaseCollectionContext';
import {CreateBlogButton} from '@/components/action-buttons';
const BlogHome = () => {
  const [posts, setPosts] = useState([]);
  const { getBlogPosts } = useFirebaseCollections();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getBlogPosts();
        setPosts(postsData);
      } catch (error) {
        // console.error('Error fetching blog posts: ', error);
      }
    };

    fetchPosts();
  }, [getBlogPosts]); // Depend on getBlogPosts

  const getExcerpt = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const firstP = doc.querySelector('p');
    return firstP ? firstP.textContent.substring(0, 100) + '...' : '';
  };

  return (
    <Container className="page-wrapper">
      <Typography variant="h2" gutterBottom>
        Construction Blog
      </Typography>
      <CreateBlogButton />
      <Box display="flex" flexWrap="wrap" justifyContent="space-around">
        {posts.map((post) => (
          <Box key={post.id} width={{ xs: '100%', sm: '45%', md: '30%' }} mb={4}>
            <Card>
              <CardActionArea>
                <Link href={`/blog/${post.id}`} passHref>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {post.header}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {getExcerpt(post.body)}
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default BlogHome;
