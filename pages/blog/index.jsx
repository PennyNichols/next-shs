import React from 'react';
import Link from 'next/link';
import { Card, CardActionArea, CardContent, Container, Typography, Box } from '@mui/material';

const posts = [
    { id: '1', title: 'Post 1', excerpt: 'This is the first post.' },
    { id: '2', title: 'Post 2', excerpt: 'This is the second post.' },
    // ...additional posts...
];

const BlogHome = () => {
    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Construction Blog
            </Typography>
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                {posts.map((post) => (
                    <Box key={post.id} width={{ xs: '100%', sm: '45%', md: '30%' }} mb={4}>
                        <Card>
                            <CardActionArea>
                                <Link href={`/blog/${post.id}`} passHref>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {post.excerpt}
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
