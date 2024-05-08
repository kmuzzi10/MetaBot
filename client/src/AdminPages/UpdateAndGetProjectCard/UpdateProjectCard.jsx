import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/Layout';
import axios from "axios";
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import { useNavigate, useParams } from 'react-router-dom';
axios.defaults.withCredentials = true;
const UpdateProjectCard = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [id, setId] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // Fetch single card on component mount
    useEffect(() => {
        const getSingleCard = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/project-cards/get-cards/${params.id}`);
                const { title, text, image, _id } = data.cardsData;
                setTitle(title);
                setText(text);
                setImageUrl(image);
                setId(_id);
            } catch (err) {
                console.log(err);
            }
        }
        getSingleCard();
    }, [params.id]);

    // Handle image upload
    const handleImageUpload = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        const imageUrl = URL.createObjectURL(selectedImage);
        setImageUrl(imageUrl);
    }

    // Handle update
    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('text', text);
            if (image) {
                formData.append('image', image);
            }
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/project-cards/update-cards/${id}`, formData);
            if (data.success) {
                alert(data.message);
            } else {
                alert("Failed to update card");
            }
        } catch (error) {
            console.log(error);
            alert('Something went wrong');
        }
    }

    // Handle delete
    const handleDelete = async () => {
        try {
            let answer = window.confirm('Are you sure want to delete this product?');
            if (answer) {
                const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/project-cards/delete-cards/${id}`);
                if (data.success) {
                    alert("Product deleted successfully");
                    // Redirect or perform any additional action after deletion
                } else {
                    alert("Failed to delete product");
                }
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }

    return (
        <Layout title={'Update product'}>
            <div className='fluid-container m-3 p-3'>
                <div className='row'>
                    <div className='col-lg-3 col-md-4 col-sm-4'>
                        <AdminMenu />
                    </div>
                    <div className='col-lg-9 col-md-8 col-sm-8'>
                        <h1>Update Cards</h1>
                        <div className='m-1 w-75'>
                            <div className='mb-3'>
                                <label className='btn btn-outline-secondary'>
                                    {image ? image.name : "Upload Photo"}
                                    <input
                                        type='file'
                                        name='photo'
                                        accept='image/*'
                                        onChange={handleImageUpload}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className='mb-3'>
                                <div className='text-center'>
                                    <img src={imageUrl} alt="card-photo" height={'200px'} className='img img-responsive' />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <input type='text' placeholder='Enter Name of Product' className='form-control' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <textarea type='text' placeholder='Enter Text of Product' className='form-control' value={text} onChange={(e) => setText(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-primary' onClick={handleUpdate}>Update Product</button>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-danger' onClick={handleDelete}>Delete Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProjectCard;
