import React, {Component} from 'react';
import Myheader from "../header/myheader";
import '../aboutUs/aboutus.css';
import Footer from "../footer/footer";

class AboutUs extends Component {
    render() {
        return (
            <div>
                < Myheader />
                <br/>
                <br/>
                <br/>
                <section id="outro">
                <div classname="outro-container" data-aos="zoom-in" data-aos-delay="100">
                    <br></br>
                    <br></br>
                    <br></br><center>
                                         <div style={{marginTop:10}}>
                    <h1 classname="mb-4 pb-0">ABOUT US<br/><span></span> </h1>
                    <p >SLIIT Conference is a brand new initiative from the faculties of Computing, Enginerring, Business Management, 
                        <br/>
                        Health Science and School of Law. This was founded as a means to help students from different parts of the 
                        <br/>
                        country to take part in the conference and share their knowledge from their relevant field of student. This 
                        <br/>
                        will help bridge the gap between students getting to know about other universities and get some knowledge to
                        <br/>
                        improve their skills. Also their work too will be submitted and they might get a chance to present their work
                        <br/>
                        to the audience.
                        </p>
                                             </div>
                </center>
                </div>
            </section>
                <Footer/>
                 
            </div>
          
        );
    }
}

export default AboutUs;


{/*   */}



