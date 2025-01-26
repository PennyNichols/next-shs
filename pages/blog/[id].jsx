import React from 'react';
import { useRouter } from 'next/router';
import { Container, Typography } from '@mui/material';

const posts = {
    '1': { title: 'Post 1', content: 'This is the content of the first post.' },
    '2': { title: 'Post 2', content: 'This is the content of the second post.' },
    // ...additional posts...
};

const BlogPost = () => {
    const router = useRouter();
    const { id } = router.query;
    const post = posts[id];

    if (!post) {
        return <Typography variant="h5">Post not found</Typography>;
    }

    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                {post.title}
            </Typography>
            <Typography variant="body1" component="p">
                {post.content}
            </Typography>
        </Container>
    );
};

export default BlogPost;
