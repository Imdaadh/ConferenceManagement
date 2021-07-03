import React, { PureComponent } from 'react'
import axios from 'axios'
import Header from '../header/myheader'
import decode from "jwt-decode";
import {API_URL} from "../utils/url";

class UserViewWorkshop extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            workshops:[],
            email:''
        }
    }
    deleteWorkshop(id){
        axios.delete('https://afprojectconference.herokuapp.com/workshop/deleteWorkshop/${id}').then(res => alert(res.data.msg))
    }

    componentDidMount(){
        if(sessionStorage.token){
            this.setState({email:decode(sessionStorage.token).email})
            axios.get('https://afprojectconference.herokuapp.com/workshop/getWorkshop').then(response =>{
            this.setState({workshops:response.data})
        } )}
    }
    render() {
        return (
            <div>
                <Header   />
                <div className="Row">
                    <h1 className="text-center" style={{ marginTop:"150PX"}}>Workshop Details</h1>
                    <table className="table table-striped table-bordered" style={{width:"1430px",marginLeft:"40px", marginTop:"20PX"}}>
                        <thead>
                        <tr>
                            <th>name</th>
                            <th>university</th>
                            <th>mobileNumber</th>
                            <th>topic</th>
                            <th>statementOfIntrest</th>
                            <th>status</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.workshops.map(
                                workshop =>{
                                    if(workshop.contactDetail==this.state.email){
                                        return(
                                            <tr key ={workshop._id}>
                                                <td>{workshop.name}</td>
                                                <td>{workshop.university}</td>
                                                <td>{workshop.contactDetail}</td>
                                                <td>{workshop.topic }</td>
                                                <td>{workshop.statementOfIntrest}</td>
                                                <td>{workshop.status}</td>
                                                <td>
                                                   {workshop.status=='reject' ?  <button style={{marginLeft:"10px"}} onClick={()=> this.deleteWorkshop(workshop._id)} className="btn btn-danger">Delete</button> : <p></p>}
                                                </td>
                                            </tr>
                            )
                        }}

                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default UserViewWorkshop