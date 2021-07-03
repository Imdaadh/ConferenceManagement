import React, { PureComponent } from 'react'
import axios from 'axios'
import Header from "../header/myheader";
import {API_URL} from "../utils/url";

class ReviewerViewWorkshop extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            workshops:[]
        }
    }
    componentDidMount(){
         axios.get('https://afprojectconference.herokuapp.com/workshop/getWorkshop').then(response =>{
            this.setState({workshops:response.data})
        } )
    }
    ApproveConference= (id,email) =>{
        const workshop = {
            status: "approved",
            email:email
        }
        axios.put('https://afprojectconference.herokuapp.com/workshop/editWorkshop/${id}',workshop).then(res => alert(res.data.msg))
    }
    RejectConference= (id,email) =>{
        const workshop = {
            status: "reject",
            email:email
        }
        axios.put('https://afprojectconference.herokuapp.com/workshop/editWorkshop/${id}',workshop).then(res => alert(res.data.msg))
    }

    render() {
        return (
                <div>
                    <Header   />
                    <div className="Row">
                    <h1 className="text-center" style={{ marginTop:"200PX"}}>Reviewer View Workshop </h1>
                    <table className="table table-striped table-bordered" style={{width:"1430px",marginLeft:"30px", marginTop:"20PX"}}>
                     <thead>
                        <tr>
                            <th>name</th>
                            <th>contactDetail</th>
                            <th>university</th>
                            <th>topic</th>
                            <th>status</th>
                            <th>Action</th>
                        </tr>
                     </thead>
                        <tbody>
                        {
                            this.state.workshops.map(
                                workshop =>{
                                    if(workshop.status=='approved' || workshop.status=='pending'){
                                        return(
                                            <tr key ={workshop._id}>
                                                <td>{workshop.name}</td>
                                                <td>{workshop.contactDetail}</td>
                                                <td>{workshop.university}</td>
                                                <td>{workshop.topic }</td>
                                                <td>{workshop.status}</td>
                                                <td>
                                                    <button  className="btn btn-info" onClick={()=> this.ApproveConference(workshop._id,workshop.contactDetail)}>Approved</button>
                                                    <button style={{marginLeft:"10px"}} onClick={()=> this.RejectConference(workshop._id,workshop.contactDetail)} className="btn btn-danger">Reject</button>
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

export default ReviewerViewWorkshop