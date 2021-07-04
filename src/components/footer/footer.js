import React from 'react'

class MyFooter extends React.Component{
    render(){
        return(
            <div>
                <footer id="footer" style={{backgroundColor:"black"}}>
                    <div className="footer-top" style={{backgroundColor:"black"}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 footer-info">
                                    
                                    <p>We are a leading non-state higher education institute approved by the University Grants Commission (UGC) under the Universities Act. </p>
                                </div>
                                
                                <p style={{marginLeft:"500px"}}><div className="col-lg-3 col-md-6 footer-contact">
                                    </div>No.20<br/>Kandy Road, Malabe<br/>Sri Lanka<br></br>
                                    <strong>Phone:</strong> +11-456-455-566<br></br>
                                    <strong>Email:</strong> info@sliit.lk<br></br>
                                </p>

                                <div className="social-links" >
                                    <a href="https://twitter.com/SLIITinfo" class="twitter"><i class="fa fa-twitter"></i></a>
                                    <a href="https://www.facebook.com/sliit.lk/" class="facebook"><i class="fa fa-facebook"></i></a>
                                    <a href="https://www.instagram.com/sliit.life/" class="instagram"><i class="fa fa-instagram"></i></a>
                                    <a href="https://www.sliit.lk" class="google-plus"><i class="fa fa-google-plus"></i></a>
                                    <a href="https://www.linkedin.com/school/sliit/" class="linkedin"><i class="fa fa-linkedin"></i></a>
                                </div>

                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }

}

export default MyFooter