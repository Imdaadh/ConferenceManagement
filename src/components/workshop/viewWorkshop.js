import React from 'react'
import Myheader from "../header/myheader";
import {Button, Card} from "react-bootstrap";
import axios from 'axios'
import {API_URL} from "../utils/url";
import Footer from "../footer/footer";

class ViewWorkshop extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            workshops:[],
            conferences:[],
        }
    }
    componentDidMount(){
        axios.get(`${API_URL}/workshop/getWorkshop`).then(response =>{
            this.setState({workshops:response.data})


        } )
        axios.get(`${API_URL}/conference/getConference`).then(response1 =>{
            this.setState({conferences:response1.data})
        } )

    }


    render() {

        if (this.state.conferences.length > 0) {


            return (

                <div>

                    <Myheader/>
                    <div>


                        <div className="intro-container" data-aos-delay="100" style={{marginLeft: 200, marginTop: 100}}>
                            {
                                this.state.workshops.map(
                                    workshop => {
                                        if (workshop.status === 'approved') {
                                            return (
                                                <Card border="danger"
                                                      bg={"danger"}
                                                      text={'light'}
                                                      style={{width: '70rem', height: '20rem', color: 'white'}}
                                                      className="mb-2"
                                                >
                                                    {/*<Card.Header><h2>Advanced Instrumental Techniques and Future of Advanced Materials</h2></Card.Header>*/}
                                                    <br></br>
                                                    <Card.Title> <b>{workshop.name}</b></Card.Title>
                                                    <hr style={{borderTopColor: "white"}}></hr>
                                                    <Card.Body style={{color: 'white', opacity: 8}}>
                                                        <Card.Text>
                                                            <p> {workshop.statementOfIntrest}</p>
                                                            <p>{workshop.university}</p>

                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            )
                                        }
                                    }
                                )
                            }
                        </div>
                    </div>
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
                                    <h1 className="mb-4 pb-0"><br/><span>no conferense is organized so workshop will be not preview</span>
                                    </h1>
                                    <p className="mb-4 pb-0">.............</p>

                                </div>
                            </center>
                        </div>
                    </section>

                </div>
            )
        }
    }
}
export default ViewWorkshop