import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import contactImage from "../assets/HomePagePics/contactpics/7056551.jpg"
import socialMedia from "../assets/HomePagePics/contactpics/socialmedia.png"
import axios from "axios"
import { Link } from 'react-router-dom'
axios.defaults.withCredentials = true;
const ContactPage = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comments: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API}/send-email`, formData);
            alert('Email sent successfully!');
            // Clear form fields after successful submission
            setFormData({ name: '', email: '', comments: '' });
        } catch (error) {
            console.error('Error:', error);
            alert('Error: Something went wrong!');
        }
    };



    return (
        <Layout>
            {/* section 1  */}
            <div className="fluid-container contact-container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h1 style={{ fontSize: '4rem' }}>Contact Us</h1>
                        <p style={{ fontSize: '1.4rem' }}>📞 Ready to elevate your project? <br />Get in touch with us today and let's start the journey towards digital excellence. Reach out to our friendly team at [Insert Contact Information] or drop us a message at EmailAddress. We're excited to hear from you!</p>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <img className='contactImage' src={contactImage} alt='contactImage' />
                    </div>
                </div>
            </div>

            {/* section 2 */}
            <div className='fluid-container contact-container-2'>
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>

                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <h1 className='drop-email' style={{ fontSize: '3rem' }}>Drop Us An Email</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Comments:</label>
                                <textarea
                                    className="form-control"
                                    name="comments"
                                    value={formData.comments}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button style={{ marginTop: '10px' }} type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            {/* section 3  */}
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <h1 className='contact-social-media' style={{ fontSize: '3rem' }}>Hit Us Up At</h1>
                        <hr style={{ width: '180px', borderTop: '8px dotted white' }} />
                        <div className='social-media-icons'>
                            <h4><Link className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#55acee', height: '70px', width: '70px' }} to='' role="button"><i className="fab fa-twitter" style={{ fontSize: '40px' }} /></Link></h4>
                            <h4><Link className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#ac2bac', height: '70px', width: '70px' }} to='' role="button"><i className="fab fa-instagram" style={{ fontSize: '40px' }} /></Link></h4>
                            <h4><Link className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#0082ca', height: '70px', width: '70px' }} to='https://www.linkedin.com/in/meta-bot-bb7b4a307/' role="button"><i className="fab fa-linkedin-in" style={{ fontSize: '40px' }} /></Link></h4>
                            <h4><Link className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#3b5998', height: '70px', width: '70px' }} to='https://www.facebook.com/people/MetaBot/61559489362619/?is_tour_dismissed' role="button"><i className="fab fa-facebook-f" style={{ fontSize: '40px' }} /></Link></h4>
                            <h4><Link className="btn btn-primary btn-floating m-1" style={{ backgroundColor: 'green', height: '70px', width: '70px' }} to='' role="button"><i className="fab fa-whatsapp" style={{ fontSize: '44px' }} /></Link></h4>



                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <img width={'550px'} height={'550px'} src={socialMedia} alt='socialmedia' />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ContactPage