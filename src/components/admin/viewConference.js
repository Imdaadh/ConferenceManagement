import React, { PureComponent } from 'react'
import axios from 'axios'
import Header from '../header/myheader'
import {API_URL} from "../utils/url";

class ViewConference extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            conferences:[]
        }
    }
    componentDidMount(){
         axios.get(`${API_URL}/conference/getConference`).then(response =>{
            this.setState({conferences:response.data})
        } )
    }
    ApproveConference(id){
        const conference = {
            status: "approved"
        }
        axios.put(`${API_URL}/conference/editStatus/${id}`,conference).then(res => alert(res.data.msg))
    }
   RejectConference(id){
        const conference = {
            status: "reject"
        }
        axios.put(`${API_URL}/conference/editStatus/${id}`,conference).then(res => alert(res.data.msg))
    }
    editUser(id){
        this.props.history.push(`/updateUser/${id}`);
    }
    render() {
        return (
                <div>
                    <Header   />
                    <div className="Row">
                    <h1 className="text-center" style={{ marginTop:"200PX"}}>Admin View Conference </h1>
                    <table className="table table-striped table-bordered" style={{width:"1430px",marginLeft:"10px", marginTop:"20PX"}}>
                     <thead>
                        <tr>
                        <th>id</th>
                            <th>name</th>
                            <th>Time</th>
                            <th>date</th>
                            <th>status</th>
                            <th>Action</th>
                        </tr>
                     </thead>
                        <tbody>
                        {
                            this.state.conferences.map(
                                conference =>{
                                    if(conference.status=='approved' ||conference.status=='pending' ){
                                        return(
                                            <tr key ={conference._id}>
                                                <td>{conference._id}</td>
                                                <td>{conference.name}</td>
                                                <td>{conference.time}</td>
                                                <td>{conference.date}</td>
                                                <td>{conference.status}</td>
                                                <td>
                                                    <button  className="btn btn-info" onClick={()=> this.ApproveConference(conference._id)}>Approved</button>
                                                    <button style={{marginLeft:"10px"}} onClick={()=> this.RejectConference(conference._id)} className="btn btn-danger">Reject</button>

                                                </td>
                                            </tr>
                                        )
                                    }
                                }

                            )
                        }
                        </tbody>
                    </table>
                    </div>
                </div>
        )
    }
}
export default ViewConference