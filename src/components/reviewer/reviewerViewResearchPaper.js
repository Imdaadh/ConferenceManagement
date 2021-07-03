import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import Myheader from "../header/myheader";
import {API_URL} from "../utils/url";

const ReviewerViewRP= () => {
    const [filesList, setFilesList] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
        const getFilesList = async () => {
            try {
                console.log("ggggg")
                const { data } = await axios.get('https://afprojectconference.herokuapp.com/getAllFiles');
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
            const result = await axios.get(`https://afprojectconference.herokuapp.com/download/`+id, {
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
    const RejectRP= (id,email) =>{
        const researchPaper = {
            status: "reject",
            email:email
        }
        axios.put(`https://afprojectconference.herokuapp.com/editStatus/`+id,researchPaper).then(res => alert(res.data.msg))
    }

    const ApproveRP= (id,email) =>{
        const researchPaper = {
            status: "approved",
            email:email
        }
        axios.put(`https://afprojectconference.herokuapp.com/editStatus/`+id,researchPaper).then(res => alert(res.data.msg))
    }
    return (
        <div  >
           <Myheader/>
            <div className="Row">
                <h1 className="text-center" style={{ marginTop:"200PX"}}>Reviewer View RESEARCH PAPER </h1>
                <table className="table table-striped table-bordered" style={{width:"1430px",marginLeft:"40px", marginTop:"20PX"}}>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Contact</th>
                        <th>File</th>
                        <th>Status</th>

                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        filesList.map(
                            fl =>{
                                if(fl.status=='approved' || fl.status=='pending'){
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
                                                <button  className="btn btn-info" onClick={()=> ApproveRP(fl._id,fl.contactDetails)}>Approved</button>
                                                <button style={{marginLeft:"10px"}} onClick={()=> RejectRP(fl._id,fl.contactDetails)} className="btn btn-danger">Reject</button>
                                            </td>
                                        </tr>
                                    )}
                            }


                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReviewerViewRP;
