import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout/Layout';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API}/api/v1/job-cards`,
});

const UploadPdf = () => {
    const params = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');
    const [education, setEducation] = useState('');
    const [file, setFile] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [cards, setCards] = useState("");
    const navigate = useNavigate()

    const gettingCards = useCallback(async () => {
        try {
            const { data } = await axiosInstance.get(`/get-cards/${params.id}`);
            if (data?.success) {
                const limitedCards = data.cardsData.title
                setCards(limitedCards);
            }
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 10000, // 10 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [params.id]);

    useEffect(() => {
        gettingCards();
        window.scrollTo(0, 0);
    }, [gettingCards]);

    const validateForm = () => {
        const errors = {};
        if (!name) errors.name = 'Name is required';
        if (!email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
        if (!phone) errors.phone = 'Phone number is required';
        else if (!/^\d{11}$/.test(phone)) errors.phone = 'Phone number is invalid';
        if (!description) errors.description = 'A brief description is required';
        if (!skills) errors.skills = 'Please list your skills';
        if (!education) errors.education = 'Education details are required';
        if (!file) errors.file = 'File is required';
        return errors;
    };

    const submitPdf = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('description', description);
        formData.append('skills', skills);
        formData.append('education', education);
        formData.append('file', file);
        formData.append('areaOfInterest', cards);

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
            setDescription('');
            setSkills('');
            setEducation('');
            setFile('');
            setErrors({});
            toast.success('Thank you for applying! We will contact you soon.', {
                position: "top-center",
                autoClose: 10000, // 10 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Delay navigation by 1 second after displaying the toast
            setTimeout(() => {
                navigate('/');
            }, 10000);
        } catch (error) {
            console.error(error);
            setIsSubmitting(false);
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 10000, // 10 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }


    };

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
                    <h1 style={{ fontSize: '3rem' }} className="text-center mb-4">Apply For Job In MetaBOT</h1>
                    <label htmlFor="name">Name</label>
                    <motion.input
                        id="name"
                        value={name}
                        type="text"
                        className="form-control mb-3"
                        onChange={(e) => setName(e.target.value)}
                        required
                        whileHover={{ scale: 1.1 }}
                        whileFocus={{ scale: 1.1 }}
                    />
                    {errors.name && <p className="text-danger">{errors.name}</p>}

                    <label htmlFor="email">Email</label>
                    <motion.input
                        id="email"
                        value={email}
                        type="email"
                        className="form-control mb-3"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        whileHover={{ scale: 1.1 }}
                        whileFocus={{ scale: 1.1 }}
                    />
                    {errors.email && <p className="text-danger">{errors.email}</p>}

                    <label htmlFor="phone">Phone Number</label>
                    <motion.input
                        id="phone"
                        value={phone}
                        type="number"
                        className="form-control mb-3"
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        whileHover={{ scale: 1.1 }}
                        whileFocus={{ scale: 1.1 }}
                    />
                    {errors.phone && <p className="text-danger">{errors.phone}</p>}

                    <label htmlFor="description">Description</label>
                    <motion.textarea
                        id="description"
                        value={description}
                        className="form-control mb-3"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        whileHover={{ scale: 1.1 }}
                        whileFocus={{ scale: 1.1 }}
                    />
                    {errors.description && <p className="text-danger">{errors.description}</p>}

                    <label htmlFor="skills">Skills</label>
                    <motion.textarea
                        id="skills"
                        value={skills}
                        className="form-control mb-3"
                        onChange={(e) => setSkills(e.target.value)}
                        required
                        whileHover={{ scale: 1.1 }}
                        whileFocus={{ scale: 1.1 }}
                    />
                    {errors.skills && <p className="text-danger">{errors.skills}</p>}

                    <label htmlFor="education">Education</label>
                    <motion.textarea
                        id="education"
                        value={education}
                        className="form-control mb-3"
                        onChange={(e) => setEducation(e.target.value)}
                        required
                        whileHover={{ scale: 1.1 }}
                        whileFocus={{ scale: 1.1 }}
                    />
                    {errors.education && <p className="text-danger">{errors.education}</p>}

                    <label htmlFor="cards">Job Position</label>
                    <motion.input
                        id="cards"
                        type="text"
                        value={cards}
                        className="form-control mb-3"
                        disabled={true}
                        whileHover={{ scale: 1.1 }}
                        whileFocus={{ scale: 1.1 }}
                    />

                    <label htmlFor="file">File Upload (PDF only)</label>
                    <motion.input
                        id="file"
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
            {/* Toast container */}
            <ToastContainer
                position="top-center"
                autoClose={10000} // 10 seconds
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Layout>
    );
};

export default UploadPdf;
