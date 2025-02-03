import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const initialState = {
    header: '',
    body: '',
    images: [''],
    keywords: [''],
};

const BlogForm = ({ setOpen }) => {

    // to do: add author by logged in username

    const [formData, setFormData] = useState(initialState);

    const handleClear = () => {
        setFormData(initialState);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOnChangeBody = (value) => {
        setFormData({ ...formData, body: value });
    };

    const handleArrayChange = (e, index, arrayName) => {
        const { name, value } = e.target;
        const newArray = [...formData[arrayName]];
        newArray[index] = value;
        setFormData({ ...formData, [arrayName]: newArray });
    };

    const addKeyword = () => {
        setFormData({ ...formData, keywords: [...formData.keywords, ''] });
    };

    const removeKeyword = (index) => {
        const newKeywords = formData.keywords.filter((_, i) => i !== index);
        setFormData({ ...formData, keywords: newKeywords });
    };

    const transformFormData = (data) => {
        const trimString = (str) => str.trim();

        const trimArray = (arr) => arr.map((item) => (typeof item === 'string' ? trimString(item) : item));

        return {
            ...data,
            header: trimString(data.header),
            keywords: trimArray(data.keywords),
            images: trimArray(data.images),
            date_created: new Date().toISOString(),
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const transformedData = transformFormData(formData);

        try {
            const docRef = await addDoc(collection(db, 'blogPosts'), transformedData);
            console.log('Document written with ID: ', docRef.id);
            console.log('form data:', transformedData);
            handleClear();
        } catch (e) {
            console.error('Error adding document: ', e);
        }
        setOpen(false)
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Header"
                name="header"
                value={formData.header}
                onChange={handleChange}
                fullWidth
            />
            <ReactQuill value={formData.body} onChange={(value) => handleOnChangeBody(value)} placeholder='Write the details of your blog post here...' />
            <Typography variant="h6">Keywords</Typography>
            {formData.keywords.map((keyword, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                        label={`Keyword ${index + 1}`}
                        name={`keyword-${index}`}
                        value={keyword}
                        onChange={(e) => handleArrayChange(e, index, 'keywords')}
                        fullWidth
                    />
                    <IconButton onClick={() => removeKeyword(index)}>
                        <Remove />
                    </IconButton>
                </Box>
            ))}
            <Button onClick={addKeyword} startIcon={<Add />}>
                Add Keyword
            </Button>

            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );
};

export default BlogForm;