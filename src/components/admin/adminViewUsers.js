import React, { PureComponent } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Header from '../header/myheader'
import {API_URL} from "../utils/url";

class AdminViewUsers extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            users:[]
        }
    }
    componentDidMount(){
        axios.get('https://afprojectconference.herokuapp.com/admin/users',{
                headers:{
                    Authorization:sessionStorage.getItem("token")
                }
            }
        ).then(response =>{
            this.setState({users:response.data})
        } )
    }
    deleteUser(id){
        axios.delete(`https://afprojectconference.herokuapp.com/user/deleteUser/${id}`).then(res => alert(res.data.msg))
    }
    editUser(id){
        this.props.history.push('/updateUser/${id}');
    }
    render() {
        return (
            <div>
                <Header   />
                <div className="Row">
                    <h1 className="text-center" style={{ marginTop:"200PX"}}>Registration Details</h1>
                    <table className="table table-striped table-bordered" style={{width:"1430px",marginLeft:"10px", marginTop:"20PX"}}>
                        <thead>
                        <tr>
                            <th>name</th>
                            <th>email</th>
                            <th>role</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map(
                                user =>
                                    <tr key ={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <Link to ={`/updateUser/${user._id}`}><button  className="btn btn-info"  >Update</button></Link>
                                            <button style={{marginLeft:"10px"}} onClick={()=> this.deleteUser(user._id)} className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default AdminViewUsers