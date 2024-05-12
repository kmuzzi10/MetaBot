import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import axios from 'axios';

const PdfViewer = () => {
  const [files, setFiles] = useState([]);

  const getAllData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/get-files`);
      setFiles(data.data); // Assuming your data is stored in the 'data' key of the response
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      <Layout>
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-lg-3 col-md-3 col-sm-4'>
              <AdminMenu />
            </div>
            <div className='col-lg-9 col-md-9 col-sm-8'>
              <h1 style={{ fontSize: '3rem' }} className='text-center'>All Training Data List</h1>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Area of Interest</th>
                    <th>File</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr key={file._id}>
                      <td>{file.name}</td>
                      <td>{file.email}</td>
                      <td>{file.phone}</td>
                      <td>{file.areaOfInterest}</td>
                      <td>
                        <a href={`${process.env.REACT_APP_API}/files/${file.file}`} className="btn btn-primary" download>
                          Download Resume
                        </a>
                      </td>


                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PdfViewer;
