import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import Myheader from "../header/myheader";
import {Link} from 'react-router-dom'
import {API_URL} from "../utils/url";

const ViewTemplate= () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const getFilesList = async () => {
      try {
        console.log("ggggg")
        const { data } = await axios.get(`${API_URL}/getAllFilesTemplate`);
        console.log(data)
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
    getFilesList();
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`${API_URL}/downloadTemplate/${id}`, {
        responseType: 'blob'
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };


  const DeleteTemplate= (id) =>{
    axios.delete(`${API_URL}/deleteTemplate/${id}`).then(res => alert(res.data.msg))
  }

  return (
      <div  >
        <Myheader/>
        <div className="Row">
          <h1 className="text-center" style={{ marginTop:"200PX"}}> RESEARCH PAPER TEMPLATE</h1>
          <Link to={'/addFileTemplate'}> <button  className="btn btn-info" style={{ marginLeft:"1200PX", width:200}} >ADD TEMPLATES</button></Link>
          <table className="table table-striped table-bordered" style={{width:"1430px",marginLeft:"50px", marginTop:"20PX"}}>
            <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>File</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {
              filesList.map(
                  fl =>
                      <tr key ={fl._id}>
                        <td>{fl.title}</td>
                        <td>{fl.description}</td>
                        <td><button  style={{ marginLeft:10 }}>  <a
                            href="#/"
                            onClick={() =>
                                downloadFile(fl._id, fl.file_path, fl.file_mimetype)
                            }
                        >
                          View Template
                        </a></button></td>
                        <td>
                          <button style={{marginLeft:"10px"}} onClick={()=> DeleteTemplate(fl._id)}  className="btn btn-danger">DELETE</button>
                        </td>
                      </tr>
              )
            }
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default ViewTemplate;