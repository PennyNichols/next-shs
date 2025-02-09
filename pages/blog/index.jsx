import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardActionArea, CardContent, Container, Typography, Box } from '@mui/material';
import CreateBlogButton from '../../components/ActionButtons/CreateBlogButton';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const BlogHome = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(db, 'blogPosts'));
            const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPosts(postsData);
        };

        fetchPosts();
    }, []);

    const getExcerpt = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const firstP = doc.querySelector('p');
        return firstP ? firstP.textContent.substring(0, 100) + '...' : '';
    };

    console.log('posts', posts)

    return (
        <Container>
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
