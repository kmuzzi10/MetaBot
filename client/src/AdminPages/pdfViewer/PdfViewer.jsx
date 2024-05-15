import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import axios from 'axios';

const PdfViewer = () => {
  const [files, setFiles] = useState([]);

  const getAllData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/get-files`);
      setFiles(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const downloadFile = async (fileId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/download/${fileId}`, {
        responseType: 'blob' // Ensure response type is blob for binary data
      });

      // Create a URL for the blob data and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf'); // Change the file name if needed
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const deleteFile = async (fileId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/delete-file/${fileId}`);
      // After deletion, update the file list
      getAllData();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

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
                    <th>Actions</th> {/* Add a new table header for actions */}
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
                        <button onClick={() => downloadFile(file._id)} className="btn btn-primary">
                          Download
                        </button>
                      </td>
                      <td>
                        <button onClick={() => deleteFile(file._id)} className="btn btn-danger">
                          Delete
                        </button>
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
