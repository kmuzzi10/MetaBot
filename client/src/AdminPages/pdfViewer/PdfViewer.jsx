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

  const downloadFile = async (fileId, fileType) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/download/${fileId}?type=${fileType}`, {
        responseType: 'blob' // Ensure response type is blob for binary data
      });

      // Create a URL for the blob data and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileType}.pdf`); // Set file name based on file type
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
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-lg-3 col-md-3 col-sm-4'>
            <AdminMenu />
          </div>
          <div className='col-lg-9 col-md-9 col-sm-8'>
            <h1 style={{ fontSize: '3rem' }} className='text-center'>All Training Data List</h1>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Job</th>
                    <th>Description</th>
                    <th>Skills</th>
                    <th>Education</th>
                    <th>Resume</th>
                    <th>Cover Letter</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr key={file._id}>
                      <td>{file.name}</td>
                      <td>{file.email}</td>
                      <td>{file.phone}</td>
                      <td>{file.areaOfInterest}</td>
                      <td>{file.description}</td>
                      <td>{file.skills}</td>
                      <td>{file.education}</td>
                      <td>
                        <button onClick={() => downloadFile(file._id, 'resume')} className="btn btn-primary">
                          Download Resume
                        </button>
                      </td>
                      <td>
                        {file.coverLetter && (
                          <button onClick={() => downloadFile(file._id, 'coverLetter')} className="btn btn-secondary">
                            Download Cover Letter
                          </button>
                        )}
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
      </div>
    </Layout>
  );
};

export default PdfViewer;
