import React, { PureComponent } from 'react'
import axios from 'axios'
import Header from '../header/myheader'
import {API_URL} from "../utils/url";

class EditorViewConference extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            conferences:[]
        }
    }
    componentDidMount(){
         axios.get('https://afprojectconference.herokuapp.com/conference/getConference').then(response =>{
            this.setState({conferences:response.data})
        } )
    }
    deleteConference(id){
        axios.delete('https://afprojectconference.herokuapp.com/conference/deleteConference/${id}').then(res => alert(res.data.msg))
    }
    editConference(id){
        this.props.history.push('/updateConference/${id}');
    }
    render() {
        return (
                <div>
                    <Header   />
                    <div className="Row">
                    <h1 className="text-center" style={{ marginTop:"200PX"}}>Conference Details</h1>
                    <table className="table table-striped table-bordered" style={{width:"1230px",marginLeft:"100px", marginTop:"20PX"}}>
                     <thead>
                        <tr>
                            <th>name</th>
                            <th>time</th>
                            <th>date</th>
                            <th>venue</th>
                            <th>status</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                     </thead>
                        <tbody>
                        {
                            this.state.conferences.map(
                                conference =>
                            <tr key ={conference._id}>
                                <td>{conference.name}</td>
                                <td>{conference.time}</td>
                                <td>{conference.date}</td>
                                <td>{conference.venue}</td>
                                <td>{conference.status}</td>
                                <td>
                                    <button  className="btn btn-info" onClick={()=> this.editConference(conference._id)}   >Update</button>
                                </td>
                                <td>
                                    {conference.status=='reject' ?  <button style={{marginLeft:"10px"}} onClick={()=> this.deleteConference(conference._id)} className="btn btn-danger">Delete</button> : <p></p>}
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
export default EditorViewConference