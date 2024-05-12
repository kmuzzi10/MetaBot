import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout/Layout';
import { motion } from 'framer-motion';

const UploadPdf = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [file, setFile] = useState('');
    const [areaOfInterest, setAreaOfInterest] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!name) {
            errors.name = 'Name is required';
        }
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }
        if (!phone) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{11}$/.test(phone)) {
            errors.phone = 'Phone number is invalid';
        }
        if (!areaOfInterest) {
            errors.areaOfInterest = 'Area of interest is required';
        }
        if (!file) {
            errors.file = 'File is required';
        }
        return errors;
    };

    const submitPdf = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('file', file);
        formData.append('areaOfInterest', areaOfInterest);

        const formErrors = validateForm();
        if (Object.keys(formErrors).length !== 0) {
            setErrors(formErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await axios.post(`${process.env.REACT_APP_API}/upload-files`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log(result);
            setIsSubmitting(false);

            // Reset form fields after successful submission
            setName('');
            setEmail('');
            setPhone('');
            setFile('');
            setAreaOfInterest('');
            setErrors({});
        } catch (error) {
            console.error(error);
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <Layout>
            <div className="container">
                <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="formStyle"
                    onSubmit={submitPdf}
                >
                    <h1 style={{ fontSize: '3rem' }} className="text-center mb-4">Form For Apply In Trainings</h1>
                    <motion.input
                        value={name}
                        type="text"
                        className="form-control mb-3"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                        whileHover={{ scale: 1.1 }}
                        whileFocus={{ scale: 1.1 }}
                    />
                    {errors.name && <p className="text-danger">{errors.name}</p>}
                    <motion.input
                        value={email}
                        type="email"
                        className="form-control mb-3"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        whileHover={{ scale: 1.1 }}
                        whileFocus={{ scale: 1.1 }}
                    />
                    {errors.email && <p className="text-danger">{errors.email}</p>}
                    <motion.input
                        value={phone}
                        type="number"
                        className="form-control mb-3"
                        placeholder="Phone Num"
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        whileHover={{ scale: 1.1 }}
                        whileFocus={{ scale: 1.1 }}
                    />
                    {errors.phone && <p className="text-danger">{errors.phone}</p>}
                    <motion.select
                        value={areaOfInterest}
                        className="form-control mb-3"
                        onChange={(e) => setAreaOfInterest(e.target.value)}
                        required
                        whileHover={{ scale: 1.1 }}
                        whileFocus={{ scale: 1.1 }}
                    >
                        <option value="">Select Area of Interest</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="ERP SAP">ERP SAP</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                    </motion.select>
                    {errors.areaOfInterest && <p className="text-danger">{errors.areaOfInterest}</p>}
                    <motion.input
                        type="file"
                        className="form-control mb-3"
                        accept="application/pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                        whileHover={{ scale: 1.1 }}
                        whileFocus={{ scale: 1.1 }}
                    />
                    {errors.file && <p className="text-danger">{errors.file}</p>}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={isSubmitting}
                        className="btn btn-success"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </motion.button>
                </motion.form>
            </div>
        </Layout>
    );
};

export default UploadPdf;
