import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const initialState = {
    conclusion: '',
    header: '',
    introduction: '',
    keywords: [''],
    images: [''],
    numberedList: [
        {
            numberedItemTitle: '',
            details: [
                {
                    detailTitle: '',
                    detailText: '',
                    subDetails: [{ subDetailTitle: '', subDetailText: '' }],
                },
            ],
        },
    ],
    details: [
        {
            detailTitle: '',
            detailText: '',
            subDetails: [{ subDetailTitle: '', subDetailText: '' }],
        },
    ],
};

const BlogForm = () => {
    const [formData, setFormData] = useState(initialState);

    const handleClear = () => {
        setFormData(initialState);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleArrayChange = (e, index, arrayName) => {
        const { name, value } = e.target;
        const newArray = [...formData[arrayName]];
        newArray[index] = value;
        setFormData({ ...formData, [arrayName]: newArray });
    };

    const handleMapChange = (e, index, arrayName, mapName) => {
        const { name, value } = e.target;
        const newArray = [...formData[arrayName]];
        newArray[index] = { ...newArray[index], [mapName]: value };
        setFormData({ ...formData, [arrayName]: newArray });
    };

    const handleDetailChange = (e, itemIndex, detailIndex, arrayName) => {
        const { name, value } = e.target;
        const newArray = [...formData[arrayName]];
        newArray[itemIndex].details[detailIndex] = { ...newArray[itemIndex].details[detailIndex], [name]: value };
        setFormData({ ...formData, [arrayName]: newArray });
    };

    const handleSubDetailChange = (e, itemIndex, detailIndex, subDetailIndex, arrayName) => {
        const { name, value } = e.target;
        const newArray = [...formData[arrayName]];
        newArray[itemIndex].details[detailIndex].subDetails[subDetailIndex] = {
            ...newArray[itemIndex].details[detailIndex].subDetails[subDetailIndex],
            [name]: value,
        };
        setFormData({ ...formData, [arrayName]: newArray });
    };

    const addKeyword = () => {
        setFormData({ ...formData, keywords: [...formData.keywords, ''] });
    };

    const removeKeyword = (index) => {
        const newKeywords = formData.keywords.filter((_, i) => i !== index);
        setFormData({ ...formData, keywords: newKeywords });
    };

    const addImage = () => {
        setFormData({ ...formData, images: [...formData.images, ''] });
    };

    const removeImage = (index) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: newImages });
    };

    const addNumberedItem = () => {
        setFormData({
            ...formData,
            numberedList: [
                ...formData.numberedList,
                {
                    numberedItemTitle: '',
                    details: [
                        {
                            detailTitle: '',
                            detailText: '',
                            subDetails: [{ subDetailTitle: '', subDetailText: '' }],
                        },
                    ],
                },
            ],
        });
    };

    const removeNumberedItem = (index) => {
        const newNumberedList = formData.numberedList.filter((_, i) => i !== index);
        setFormData({ ...formData, numberedList: newNumberedList });
    };

    const addDetailToNumberedItem = (itemIndex) => {
        const newNumberedList = [...formData.numberedList];
        newNumberedList[itemIndex].details.push({
            detailTitle: '',
            detailText: '',
            subDetails: [{ subDetailTitle: '', subDetailText: '' }],
        });
        setFormData({ ...formData, numberedList: newNumberedList });
    };

    const removeDetailFromNumberedItem = (itemIndex, detailIndex) => {
        const newNumberedList = [...formData.numberedList];
        newNumberedList[itemIndex].details = newNumberedList[itemIndex].details.filter((_, i) => i !== detailIndex);
        setFormData({ ...formData, numberedList: newNumberedList });
    };

    const addSubDetailToNumberedItem = (itemIndex, detailIndex) => {
        const newNumberedList = [...formData.numberedList];
        newNumberedList[itemIndex].details[detailIndex].subDetails.push({ subDetailTitle: '', subDetailText: '' });
        setFormData({ ...formData, numberedList: newNumberedList });
    };

    const removeSubDetailFromNumberedItem = (itemIndex, detailIndex, subDetailIndex) => {
        const newNumberedList = [...formData.numberedList];
        newNumberedList[itemIndex].details[detailIndex].subDetails = newNumberedList[itemIndex].details[detailIndex].subDetails.filter(
            (_, i) => i !== subDetailIndex
        );
        setFormData({ ...formData, numberedList: newNumberedList });
    };

    const addDetail = () => {
        setFormData({
            ...formData,
            details: [...formData.details, { detailTitle: '', detailText: '', subDetails: [{ subDetailTitle: '', subDetailText: '' }] }],
        });
    };

    const removeDetail = (index) => {
        const newDetails = formData.details.filter((_, i) => i !== index);
        setFormData({ ...formData, details: newDetails });
    };

    const addSubDetail = (index) => {
        const newDetails = [...formData.details];
        newDetails[index].subDetails.push({ subDetailTitle: '', subDetailText: '' });
        setFormData({ ...formData, details: newDetails });
    };

    const removeSubDetail = (index, subIndex) => {
        const newDetails = [...formData.details];
        newDetails[index].subDetails = newDetails[index].subDetails.filter((_, i) => i !== subIndex);
        setFormData({ ...formData, details: newDetails });
    };

    const trimFormData = (data) => {
        const trimString = (str) => str.trim();

        const trimArray = (arr) => arr.map((item) => (typeof item === 'string' ? trimString(item) : item));

        const trimDetails = (details) =>
            details.map((detail) => ({
                ...detail,
                detailTitle: trimString(detail.detailTitle),
                detailText: trimString(detail.detailText),
                subDetails: detail.subDetails.map((subDetail) => ({
                    ...subDetail,
                    subDetailTitle: trimString(subDetail.subDetailTitle),
                    subDetailText: trimString(subDetail.subDetailText),
                })),
            }));

        return {
            ...data,
            conclusion: trimString(data.conclusion),
            header: trimString(data.header),
            introduction: trimString(data.introduction),
            keywords: trimArray(data.keywords),
            images: trimArray(data.images),
            numberedList: data.numberedList.map((item) => ({
                ...item,
                numberedItemTitle: trimString(item.numberedItemTitle),
                details: trimDetails(item.details),
            })),
            details: trimDetails(data.details),
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedData = trimFormData(formData);

        try {
            const docRef = await addDoc(collection(db, 'blogPosts'), trimmedData);
            console.log('Document written with ID: ', docRef.id);
            console.log('form data:', trimmedData);
            handleClear();
        } catch (e) {
            console.error('Error adding document: ', e);
        }
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
            <TextField
                label="Introduction"
                name="introduction"
                value={formData.introduction}
                onChange={handleChange}
                fullWidth
                multiline
                minRows={4}
                maxRows={10}
            />
            <Typography variant="h6">Numbered List</Typography>
            {formData.numberedList.map((item, itemIndex) => (
                <Box key={itemIndex} sx={{ display: 'flex', flexDirection: 'column', gap: 1, outline: '1px solid black', padding: 3 }}>
                    <TextField
                        label="Numbered Item Title"
                        name="numberedItemTitle"
                        value={item.numberedItemTitle}
                        onChange={(e) => handleMapChange(e, itemIndex, 'numberedList', 'numberedItemTitle')}
                        fullWidth
                    />
                    <Typography variant="h6">Details</Typography>
                    {item.details.map((detail, detailIndex) => (
                        <Box key={detailIndex} sx={{ display: 'flex', flexDirection: 'column', gap: 1, outline: '1px solid black', padding: 3 }}>
                            <TextField
                                label="Detail Title"
                                name="detailTitle"
                                value={detail.detailTitle}
                                onChange={(e) => handleDetailChange(e, itemIndex, detailIndex, 'numberedList')}
                                fullWidth
                            />
                            <TextField
                                label="Detail Text"
                                name="detailText"
                                value={detail.detailText}
                                onChange={(e) => handleDetailChange(e, itemIndex, detailIndex, 'numberedList')}
                                fullWidth
                                multiline
                                minRows={2}
                                maxRows={5}
                            />
                            <Typography variant="h6">Sub Details</Typography>
                            {detail.subDetails.map((subDetail, subDetailIndex) => (
                                <Box key={subDetailIndex} sx={{ display: 'flex', flexDirection: 'column', gap: 1, outline: '1px solid black', padding: 3 }}>
                                    <TextField
                                        label="Sub Detail Title"
                                        name="subDetailTitle"
                                        value={subDetail.subDetailTitle}
                                        onChange={(e) => handleSubDetailChange(e, itemIndex, detailIndex, subDetailIndex, 'numberedList')}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Sub Detail Text"
                                        name="subDetailText"
                                        value={subDetail.subDetailText}
                                        onChange={(e) => handleSubDetailChange(e, itemIndex, detailIndex, subDetailIndex, 'numberedList')}
                                        fullWidth
                                        multiline
                                        minRows={2}
                                        maxRows={5}
                                    />
                                    <IconButton onClick={() => removeSubDetailFromNumberedItem(itemIndex, detailIndex, subDetailIndex)}>
                                        <Remove />
                                    </IconButton>
                                </Box>
                            ))}
                            <Button onClick={() => addSubDetailToNumberedItem(itemIndex, detailIndex)} startIcon={<Add />}>
                                Add Sub Detail
                            </Button>
                            <IconButton onClick={() => removeDetailFromNumberedItem(itemIndex, detailIndex)}>
                                <Remove />
                            </IconButton>
                        </Box>
                    ))}
                    <Button onClick={() => addDetailToNumberedItem(itemIndex)} startIcon={<Add />}>
                        Add Detail
                    </Button>
                    <IconButton onClick={() => removeNumberedItem(itemIndex)}>
                        <Remove />
                    </IconButton>
                </Box>
            ))}
            <Button onClick={addNumberedItem} startIcon={<Add />}>
                Add Numbered Item
            </Button>
            <Typography variant="h6">Details</Typography>
            {formData.details.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 1, outline: '1px solid black', padding: 3 }}>
                    <TextField
                        label="Detail Title"
                        name={`detailTitle-${index}`}
                        value={item.detailTitle}
                        onChange={(e) => handleMapChange(e, index, 'details', 'detailTitle')}
                        fullWidth
                    />
                    <TextField
                        label="Detail Text"
                        name={`detailText-${index}`}
                        value={item.detailText}
                        onChange={(e) => handleMapChange(e, index, 'details', 'detailText')}
                        fullWidth
                        multiline
                        minRows={2}
                        maxRows={5}
                    />
                    <Typography variant="h6">Sub Details</Typography>
                    {item.subDetails.map((subDetail, subIndex) => (
                        <Box key={subIndex} sx={{ display: 'flex', flexDirection: 'column', gap: 1, outline: '1px solid black', padding: 3 }}>
                            <TextField
                                label="Sub Detail Title"
                                name="subDetailTitle"
                                value={subDetail.subDetailTitle}
                                onChange={(e) => handleSubDetailChange(e, index, subIndex)}
                                fullWidth
                            />
                            <TextField
                                label="Sub Detail Text"
                                name="subDetailText"
                                value={subDetail.subDetailText}
                                onChange={(e) => handleSubDetailChange(e, index, subIndex)}
                                fullWidth
                                multiline
                                minRows={2}
                                maxRows={5}
                            />
                            <IconButton onClick={() => removeSubDetail(index, subIndex)}>
                                <Remove />
                            </IconButton>
                        </Box>
                    ))}
                    <Button onClick={() => addSubDetail(index)} startIcon={<Add />}>
                        Add Sub Detail
                    </Button>
                    <IconButton onClick={() => removeDetail(index)}>
                        <Remove />
                    </IconButton>
                </Box>
            ))}
            <Button onClick={addDetail} startIcon={<Add />}>
                Add Detail
            </Button>
            <TextField
                label="Conclusion"
                name="conclusion"
                value={formData.conclusion}
                onChange={handleChange}
                fullWidth
                multiline
                minRows={4}
                maxRows={10}
            />
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

            <Typography variant="h6">Images</Typography>
            {formData.images.map((image, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                        label={`Image ${index + 1}`}
                        name={`image-${index}`}
                        value={image}
                        onChange={(e) => handleArrayChange(e, index, 'images')}
                        fullWidth
                    />
                    <IconButton onClick={() => removeImage(index)}>
                        <Remove />
                    </IconButton>
                </Box>
            ))}
            <Button onClick={addImage} startIcon={<Add />}>
                Add Image
            </Button>

            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );
};

export default BlogForm;