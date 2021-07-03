import React, { PureComponent } from 'react'
import axios from 'axios'
import Myheader from "../header/myheader";
import Footer from "../footer/footer";
import {API_URL} from "../utils/url";
class UpdateRegistration extends PureComponent {
    constructor(props) {
        super(props)
            this.onChange = this.onChange.bind(this);
            this.onSubmit=this.onSubmit.bind(this);
        this.state = {
            name:'',
            email:'',
            role:'',
            users:[]
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    componentDidMount = () =>{
        const id =this.props.match.params._id;
        axios.get(`https://afprojectconference.herokuapp.com/admin/users/`+id).then(res =>{
        this.setState({
            name:res.data.name,
            email:res.data.email,
            role:res.data.role
        })
       } )
   }
    onSubmit(e){
        e.preventDefault();
        try {
                const users={
                    role:this.state.role
                }
                console.log( this.props.match.params.id);
                axios.put(`https://afprojectconference.herokuapp.com/user/editUser/${this.props.match.params._id}`,users).then(res => alert(res.data.msg))
                this.props.history.push('/admin-view')
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    render() {
        return (
            <div>
                <Myheader/>
                <br/>
                <br/>
                <div className="login-page"style={{  height: 600, borderColor:"red"}}>
                    <h1>Update User</h1>
                    <form  onSubmit={this.onSubmit}   >
                        <div className="form-group" style={{borderColor:"red"}}>
                            <input type="text" className="form-control" style={{borderColor:"red"}}name="name" value={this.state.name} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" style={{borderColor:"#FF0000"}}  name="email"  value={this.state.email}   />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" style={{borderColor:"#FF0000"}}  name="role"  value={this.state.role}  onChange={this.onChange} />
                        </div>
                        <div className="row">
                            <button type="submit" style={{backgroundColor:"#DC3545", border:"none", marginLeft:"20px"}}>submit</button>
                        </div>
                    </form>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default UpdateRegistration