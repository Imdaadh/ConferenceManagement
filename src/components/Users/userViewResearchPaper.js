import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import Myheader from "../header/myheader";
import decode from "jwt-decode";
import {API_URL} from "../utils/url";

const UserViewRP= () => {
    const [filesList, setFilesList] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [email, setEmail] = useState('');
    useEffect(() => {
        const getFilesList = async () => {
            try {

                const { data } = await axios.get('https://afprojectconference.herokuapp.com/getAllFiles');
                if(sessionStorage.token){
                   setEmail(decode(sessionStorage.token).email)
                }
                console.log(email)
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
            const result = await axios.get('https://afprojectconference.herokuapp.com/download/${id}', {
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

    const  deleteRP= (id)=>{
        axios.delete('https://afprojectconference.herokuapp.com/deleteFile/${id}').then(res => alert(res.data.msg))
    }



    return (
        <div  >
           <Myheader/>
            <div className="Row">
                <h1 className="text-center" style={{ marginTop:"200PX"}}> RESEARCH PAPER </h1>
                <table className="table table-striped table-bordered" style={{width:"1430px",marginLeft:"40px", marginTop:"20PX"}}>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Contact</th>
                        <th>File</th>
                        <th>Status</th>
                        <th></th>


                    </tr>
                    </thead>
                    <tbody>
                    {
                        filesList.map(
                            fl =>
                            {
                                if(fl.contactDetails==email){
                                    return(
                                        <tr key ={fl._id}>
                                            <td>{fl.title}</td>
                                            <td>{fl.description}</td>
                                            <td>{fl.contactDetails}</td>
                                            <td><button  style={{ marginLeft:10 }}>  <a
                                                href="#/"
                                                onClick={() =>
                                                    downloadFile(fl._id, fl.file_path, fl.file_mimetype)
                                                }
                                            >
                                                View Research Paper
                                            </a></button></td>
                                            <td>{fl.status}</td>
                                            <td>
                                                {fl.status=='reject' ?  <button style={{marginLeft:"10px"}} onClick={()=> deleteRP(fl._id)} className="btn btn-danger">Delete</button> : <p></p>}
                                            </td>
                                        </tr>
                                    )
                                }
                            }

                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserViewRP;
