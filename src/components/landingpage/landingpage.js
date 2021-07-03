import React from 'react'
import {Button} from "react-bootstrap";
import axios from 'axios'
import Footer from '../footer/footer'
import {API_URL} from "../utils/url";

class Landingpage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            conferences:[],
            approvedConference:[],
            today:'',
            count:0
        }
    }
    componentDidMount(){
        axios.get('https://afprojectconference.herokuapp.com/conference/getConference').then(response =>{
            this.setState({conferences:response.data})


        } )




    }
    addApproved(){
       return this.state.count=this.state.count+2
    }
    addReject(){
        return this.state.count=this.state.count+1
    }

    render() {
        if(this.state.conferences.length > 0){
            return (
                <div>
                    {
                        this.state.conferences.map(
                            conference => {
                                if (conference.status === 'approved') {
                                    this.addApproved()
                                    return (

                                        <section id="intro">
                                            <div className="intro-container" data-aos="zoom-in" data-aos-delay="100">
                                                <br></br>
                                                <br></br>
                                                <br></br>
                                                <center>
                                                    <div style={{marginTop: 150}}>
                                                        <h1 className="mb-4 pb-0">{new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(new Date(conference.date))}<br/><span>{conference.name}</span>
                                                        </h1>
                                                        <p className="mb-4 pb-0">{new Intl.DateTimeFormat('en-US', {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit'
                                                        }).format(new Date(conference.date))}, {conference.venue}</p>
                                                        <Button variant="outline-danger">About The Event</Button>
                                                    </div>
                                                </center>
                                            </div>
                                        </section>
                                    )
                                } else {
                                    this.addReject()
                                    if (this.state.count == 1) {
                                        return (
                                            <section id="intro">


                                                <div className="intro-container" data-aos="zoom-in"
                                                     data-aos-delay="100">
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <center>
                                                        <div style={{marginTop: 150}}>
                                                            <h1 className="mb-4 pb-0"><br/><span>no conferense is organized</span>
                                                            </h1>
                                                            <p className="mb-4 pb-0">.............</p>

                                                        </div>
                                                    </center>
                                                </div>
                                            </section>
                                        )
                                    }
                                }
                            }
                        )
                    }
                    {
                        this.state.conferences.map(
                            conference => {
                                if (conference.status === 'approved') {
                                    return (
                                        <main id="main">
                                            <section id="about">
                                                <div className="container" data-aos="fade-up">
                                                    <center>
                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <h2>About The Event</h2>

                                                                <p>Starting from the 20th of July upto 22nd of July
                                                                    2021, the event will be taking place with
                                                                    participations
                                                                    <br></br>

                                                                    of various field of people from different sectors of
                                                                    the industry to give an idea about how the technical
                                                                    world moves forward with ICT.
                                                                    <br></br></p>
                                                            </div>
                                                            <div className="col-lg-3">
                                                                <br></br>
                                                                <h3>Where</h3>
                                                                <p>{conference.venue}</p>
                                                            </div>
                                                            <div className="col-lg-3">
                                                                <h3>When</h3>
                                                                <p>Monday to Wednesday<br/>{conference.time}</p>


                                                                <p>date : {new Intl.DateTimeFormat('en-US', {
                                                                    year: 'numeric',
                                                                    month: '2-digit',
                                                                    day: '2-digit'
                                                                }).format(new Date(conference.date))}</p>

                                                            </div>
                                                        </div>
                                                    </center>
                                                </div>
                                            </section>
                                        </main>
                                    )
                                } else {
                                }
                            }
                        )
                    }
                    <Footer/>
                </div>
            )
        }else{
            return (
                <div>
                <section id="intro">


                    <div className="intro-container" data-aos="zoom-in"
                         data-aos-delay="100">
                        <br></br>
                        <br></br>
                        <br></br>
                        <center>
                            <div style={{marginTop: 150}}>
                                <h1 className="mb-4 pb-0"><br/><span>no conferense is organized</span>
                                </h1>
                                <p className="mb-4 pb-0">.............</p>

                            </div>
                        </center>
                    </div>
                </section>
            <Footer/>
                </div>
            )
        }
    }
}
export default Landingpage
