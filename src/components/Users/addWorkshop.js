import React, { PureComponent } from 'react'
import axios from 'axios'
import  '../Registration/login.css'
import Header from "../header/myheader";
import Footer from "../footer/footer"
import decode from "jwt-decode";
import {API_URL} from "../utils/url";

class ADDWorkshop extends PureComponent {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state = {
            name:'',
            university:'',
            mobileNumber:'',
            topic:'',
            statementOfIntrest:'',
            email:''
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    componentDidMount() {

        if(sessionStorage.token){

            this.setState({email:decode(sessionStorage.token).email})
        }

    }
    onSubmit(e){
        e.preventDefault();
        try {
console.log("email is bbbbb :"+this.state.email)
            const workshops={
                name:this.state.name,
                university:this.state.university,
                mobileNumber:this.state.mobileNumber,
                topic:this.state.topic,
                statementOfIntrest:this.state.statementOfIntrest,
                contactDetail:this.state.email
                }
                console.log(workshops);
                axios.post('${API_URL}/workshop/addWorkshop',workshops).then(res => alert(res.data.msg))
                  this.props.history.push('/userViewWorkshop')
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    render() {
        return (
            <div>
                <Header   />
                <div className="login-page"    style={{  height: 700, marginTop:150}}>
                      <h1>Add Workshop</h1>
                      <form  onSubmit={this.onSubmit}>
                          <input type='text'  placeholder="Name"  name="name" value={this.state.name} onChange={this.onChange} required={true}/>
                          <input type='text'  placeholder="university"  name="university"  value={this.state.university}  onChange={this.onChange}required={true}/>
                          <input type='number'  placeholder="mobileNumber"  name="mobileNumber"  value={this.state.mobileNumber}  onChange={this.onChange}required={true}/>
                          <input type='text'   placeholder="topic" name="topic" value={this.state.topic} onChange={this.onChange} required={true}/>
                          <input type='description'  placeholder="statementOfIntrest" name="statementOfIntrest"  value={this.state.statementOfIntrest}  onChange={this.onChange}required={true}/>
                          <div className="row">
                              <button type="submit">submit</button>
                          </div>
                      </form>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default ADDWorkshop