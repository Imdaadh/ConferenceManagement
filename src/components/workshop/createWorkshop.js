import React, { useState, useRef ,useEffect} from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Header from '../header/myheader'
import {useParams} from 'react-router-dom'
import decode from "jwt-decode";
import {API_URL} from "../utils/url";
import  '../Registration/login.css'


const CreateWorkshop = (props) => {
    const [file, setFile] = useState(null); // state for storing actual image
    const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
    const [email, setEmail] = useState('');
    const params = useParams()
    const [state, setState] = useState({
        title:'',
        university:'',
        topic:'',
        contactDetails:''



    });
    const [errorMsg, setErrorMsg] = useState('');
    const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
    const dropRef = useRef(); // React ref for managing the hover state of droppable area

    ///////
    useEffect(() => {
        const getFilesList = async () => {
            try {
                if(sessionStorage.token){
                    // this.setState({email:decode(sessionStorage.token).email})
                    setEmail(decode(sessionStorage.token).email)
                }

            } catch (error) {
                error.response && setErrorMsg(error.response.data);
            }
        };
        getFilesList();
    }, []);
    /////////




    const handleInputChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const onDrop = (files) => {
        const [uploadedFile] = files;
        setFile(uploadedFile);

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewSrc(fileReader.result);
        };
        fileReader.readAsDataURL(uploadedFile);
        setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
        dropRef.current.style.border = '2px dashed #e9ebeb';
    };

    const updateBorder = (dragState) => {
        if (dragState === 'over') {
            dropRef.current.style.border = '2px solid #000';
        } else if (dragState === 'leave') {
            dropRef.current.style.border = '2px dashed #e9ebeb';
        }
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        try {
            const { title ,university,topic,contactDetails} = state;
            if (title.trim() !== '' && university.trim() !== '') {
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('title', title);
                    formData.append('university', university);
                    formData.append('topic', topic);
                    formData.append('contactDetails', contactDetails);

                    setErrorMsg('');
                    await axios.post(`https://conference-app-af.herokuapp.com/workshop/addWorkshop`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(res => alert(res.data.msg))
                    props.history.push('/');
                } else {
                    setErrorMsg('Please select a file to add.');
                }
            } else {
                setErrorMsg('Please enter all the field values.');
            }
        } catch (error) {
            error.response && setErrorMsg(error.response.data);
        }
    };

    return (
        <React.Fragment>
            <Header />
            <div className="login-page"    style={{  height: 800, marginTop:150}}>
                <Form className="search-form" onSubmit={handleOnSubmit} style={{  }}>
                    {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                    <Row>
                        <Col>
                            <Form.Group controlId="title" style={{width:500}}>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={state.title || ''}
                                    placeholder="Enter title"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="university" style={{width:500}}>
                                <Form.Control
                                    type="text"
                                    name="university"
                                    value={state.university || ''}
                                    placeholder="Enter university"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <Form.Group controlId="topic" style={{width:500}}>
                                <Form.Control
                                    type="text"
                                    name="topic"
                                    value={state.topic || ''}
                                    placeholder="Enter topic"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="contactDetails" style={{width:500}}>
                                <Form.Control
                                    type="text"
                                    name="contactDetails"
                                    value={state.contactDetails || ''}
                                    placeholder="Enter the E-Mail to Contact"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>



                    <div className="upload-section">
                        <Dropzone
                            onDrop={onDrop}
                            onDragEnter={() => updateBorder('over')}
                            onDragLeave={() => updateBorder('leave')}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                                    <input {...getInputProps()} />
                                    <p style={{backgroundColor:'lightgray',width:500,height:100}}>Drag and drop a file OR click here to select a file</p>
                                    {file && (
                                        <div>
                                            <strong>Selected file:</strong> {file.name}
                                        </div>
                                    )}
                                </div>
                            )}
                        </Dropzone>
                        {previewSrc ? (
                            isPreviewAvailable ? (
                                <div className="image-preview">
                                    <img className="preview-image" src={previewSrc} alt="Preview" />
                                </div>
                            ) : (
                                <div className="preview-message">
                                    <p>No preview available for this file</p>
                                </div>
                            )
                        ) : (
                            <div className="preview-message">
                                <p>Image preview will be shown here after selection</p>
                            </div>
                        )}

                    </div>
                    <Button variant="primary" type="submit" style={{width:300,marginRight:1000}}>
                        Submit
                    </Button>
                </Form></div>
        </React.Fragment>
    );
};

export default CreateWorkshop;
