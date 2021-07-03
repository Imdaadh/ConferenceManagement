import React, { PureComponent } from 'react'
import axios from 'axios'
import Myheader from "../header/myheader";
import './login.css'
import decode from "jwt-decode";
import Footer from "../footer/footer";
import {API_URL} from "../utils/url";

class Login extends PureComponent {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state = {
            email:'',
            password:'',
            loginUser:'',
            name:'',
            userrole:''
        }
    }
    componentDidMount() {
        if(sessionStorage.token){
            this.setState({userrole:decode(sessionStorage.token).role})
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e){
        e.preventDefault();
        try {
                const users={
                    email:this.state.email,
                    password:this.state.password
                }
                axios.post('https://afprojectconference.herokuapp.com/conference/getConference/user/login',users).then(res=>{
                        if (res.data.success){
                                alert(res.data.role)
                                this.props.history.push('/')
                        }else{
                            sessionStorage.setItem("token",res.data.accessToken)
                            if (res.data.role==='editor') {
                                alert("welcome"+res.data.role)
                                this.props.history.push('/editorViewConference')
                            }else if(res.data.role==='reviewer'){
                                alert("welcome"+res.data.role)
                                this.props.history.push('/ReviewerViewWorkshop')
                            }else  if(res.data.role==='admin') {
                                alert("welcome"+res.data.role)
                                this.props.history.push('/adminViewConference')
                            }else  if(res.data.role==='researcher') {
                                alert("welcome"+res.data.role)
                                this.props.history.push('/userViewRP')
                            }else  if(res.data.role==='workshop presenter') {
                                alert("welcome"+res.data.role)
                                this.props.history.push('/userViewWorkshop')
                            }
                        }
                }
                )
         } catch (error) {
            alert(error.response.data.msg)
        }
    }

    render() {
        return (
            <div>
               < Myheader />
               <br/>
               <br/>
            <div className="login-page" style={{borderColor:"red",marginTop:150}}>
                <h1>LOGIN FORM </h1>
                <form  onSubmit={this.onSubmit} style={{borderColor:"red"}}>
                    <div className="form-group" style={{borderColor:"red"}}>
                        <input type="text" className="form-control"  style={{borderColor:"red"}} placeholder="Enter Email" name="email"  value={this.state.email}  onChange={this.onChange} required={true} />
                    </div>
                    <div className="form-group" style={{borderColor:"red"}}>
                        <input type="password" className="form-control"  style={{borderColor:"red"}} placeholder="Enter Password" name="password"  value={this.state.password}  onChange={this.onChange} required={true} />
                    </div>
                    <div className="row">
                      <button type="submit"  style={{backgroundColor:"#DC3545", border:"none", marginLeft:"20px"}}>submit</button>
                    </div>
               </form>
            </div>
                <Footer/>
            </div>
        )
    }
}

export default Login