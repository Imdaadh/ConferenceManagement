import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import Myheader from "../header/myheader";
import {Card} from "react-bootstrap";
import {API_URL} from "../utils/url";

const HomeFileTemplates = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  useEffect(() => {
    const getFilesList = async () => {
      try {

        const { data } = await axios.get('${API_URL}/getAllFilesTemplate');
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
      const result = await axios.get('${API_URL}/downloadTemplate/${id}', {
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

  return (
      <div  >
        <Myheader/>
        <div>
         <div className="intro-container"  data-aos-delay="100"   style={{ marginLeft:200 , marginTop:100}}>
            <h1>Templates</h1>
            {
              filesList.map(
                  fl =>
                       <Card border="danger" bg={"danger"} text={'light'}   style={{ width: '70rem', height: '20rem' , color:'white'}} className="mb-2" >
                            <br></br>
                            <Card.Title>  <b>{fl.description}</b></Card.Title>
                            <hr style={{ borderTopColor:"white" }} ></hr>
                            <Card.Body style={{color:'white',opacity: 8}}>
                              <Card.Text>
                                <button  style={{ marginLeft:900 }}>  <a
                                    href="#/"
                                    onClick={() =>
                                        downloadFile(fl._id, fl.file_path, fl.file_mimetype)
                                    }
                                >
                                  Download
                                </a></button>
                              </Card.Text>
                            </Card.Body>
                          </Card>
              )
            }
          </div>
        </div>
      </div>
 );
};

export default HomeFileTemplates;
