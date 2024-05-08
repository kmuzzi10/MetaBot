import React, { useState, useEffect } from 'react'
import Layout from '../../Layout/Layout'
import axios from "axios"
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import { Select } from "antd"
const { Option } = Select
// import { useNavigate } from "react-router-dom"
axios.defaults.withCredentials = true;

const CreateNewsCard = () => {
    // const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [image, setImage] = useState("")


    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append("title", title)
            productData.append("text", text)
            productData.append("image", image)

            const { data } = axios.post(`${process.env.REACT_APP_API}/api/v1/news-cards/create-card`, productData)
            if (data?.success) {
                alert(data?.message)
            } else {

                alert("Card Created Successfully")
            }
        } catch (error) {
            console.log(error)
            alert('Something Went Wrong')
        }
    }

    return (
        <Layout title={'Create Card'}>
            <div className='fluid-container m-3 p-3'>
                <div className='row'>
                    <div className='col-lg-3 col-md-4 col-sm-4'>
                        <AdminMenu />
                    </div>
                    <div className='col-lg-9 col-md-8 col-sm-8'>
                        <h1 style={{ fontSize: '4rem' }}>Create News Cards</h1>
                        <div className='m-1 w-75'>
                            <div className='mb-3'>
                                <label className='btn btn-outline-secondary'>
                                    {image ? image.name : "Upload Photo"}
                                    <input type='file' name='photo' accept='image/*' onChange={(e) => setImage(e.target.files[0])} hidden />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {image && (
                                    <div className='text-center'>
                                        <img src={URL.createObjectURL(image)} alt="product-photo" height={'200px'} className='img img-responsive' />

                                    </div>
                                )}
                            </div>
                            <div className='mb-3'>
                                <input type='text' placeholder='Enter Title of Card' className='form-control' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <textarea
                                    placeholder='Enter Text of Card'
                                    className='form-control'
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-primary' onClick={handleCreate}>Add Card</button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateNewsCard