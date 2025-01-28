import React, { useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import useStyles from './EstimateRequestForm.styles';
import useRecaptcha from '../../../hooks/useRecaptcha';
import ActionButton from '../../ReusableComponents/ActionButton/ActionButton';


const EstimateRequestForm = ({ setOpen }) => {
    const initialData = {
        name: '',
        address: '',
        phone: '',
        email: '',
        scopeOfWork: {
            construction: false,
            plumbing: false,
            electrical: false,
            painting: false,
            miscellaneous: false,
        },
        details: '',
    }

    const classes = useStyles();

    const [formData, setFormData] = useState(initialData);

    const { executeRecaptcha } = useRecaptcha(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);


    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                scopeOfWork: {
                    ...prevData.scopeOfWork,
                    [name]: checked,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleClear = () => {
        setFormData(initialData);
    };

    const transformScopeOfWork = (scopeOfWork) => {
        return Object.keys(scopeOfWork).filter(key => scopeOfWork[key]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const transformedFormData = {
            ...formData,
            scopeOfWork: transformScopeOfWork(formData.scopeOfWork),
        };

        const token = await executeRecaptcha('contact_form'); // Action name
        if (token) {
            try {
                const docRef = await addDoc(collection(db, 'estimateRequests'), transformedFormData);
                console.log('Document written with ID: ', docRef.id);
                console.log('form data:', transformedFormData);
                handleClear(); // Reset form data and isHuman state
            } catch (e) {
                console.error('Error adding document: ', e);
            }
            setOpen(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box className={classes.formContainer}>
                <Box>
                    <Typography mb={2}>Please fill out the form below to request an estimate.</Typography>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                        size='small'
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                        size='small'
                    />
                    <TextField
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                        size='small'
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                        size='small'
                    />
                    <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
                        Scope of Work
                    </Typography>
                    <FormGroup>
                        <Box sx={{ display: 'flex', gap: '30px', mb: 2 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <FormControlLabel
                                    control={<Checkbox checked={formData.scopeOfWork.carpentry} onChange={handleChange} name="carpentry" size='small' />}
                                    label="Carpentry"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={formData.scopeOfWork.masonry} onChange={handleChange} name="masonry" size='small' />}
                                    label="Masonry"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={formData.scopeOfWork.painting} onChange={handleChange} name="painting" size='small' />}
                                    label="Painting"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={formData.scopeOfWork.tile} onChange={handleChange} name="tile" size='small' />}
                                    label="Tile"
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                                <FormControlLabel
                                    control={<Checkbox checked={formData.scopeOfWork.fencing} onChange={handleChange} name="fencing" size='small' />}
                                    label="Fencing"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={formData.scopeOfWork.fixtures} onChange={handleChange} name="fixtures" size='small' />}
                                    label="Fixtures"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={formData.scopeOfWork.miscellaneous} onChange={handleChange} name="miscellaneous" size='small' />}
                                    label="Miscellaneous"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={formData.scopeOfWork.other} onChange={handleChange} name="other" size='small' />}
                                    label="Other / Unsure"
                                />

                            </Box>
                        </Box>
                    </FormGroup>
                    <TextField
                        label="Additional Details"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                        margin="dense"
                        size='small'
                    />
                </Box>
                <Box>

                    <Box mt={2} gap={2} display="flex" justifyContent="flex-end">
                        <ActionButton buttonType="clear" buttonVariant="text" text="Clear" onClick={handleClear} />
                        <ActionButton buttonType="submit" text="Submit" />
                    </Box>
                </Box>
            </Box>
        </form>
    );
};

export default EstimateRequestForm;