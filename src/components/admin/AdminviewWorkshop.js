import React, { PureComponent } from 'react'
import axios from 'axios'
import Header from '../header/myheader'
import {API_URL} from "../utils/url";
class AdminViewWorkshop extends PureComponent {
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
                            <th>Email</th>
                            <th>topic</th>
                            <th>statementOfIntrest</th>
                            <th>status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.workshops.map(
                                workshop =>
                                    <tr key ={workshop._id}>
                                        <td>{workshop.name}</td>
                                        <td>{workshop.university}</td>
                                        <td>{workshop.contactDetail}</td>
                                        <td>{workshop.topic }</td>
                                        <td>{workshop.statementOfIntrest}</td>
                                        <td>{workshop.status}</td>
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
export default AdminViewWorkshop