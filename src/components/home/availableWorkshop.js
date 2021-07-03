import React, { PureComponent } from 'react'
import axios from 'axios'
import Header from "../header/header";

class AvailableWorkshop extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            workshops:[]
        }
    }


    componentDidMount(){
        axios.get('http://localhost:5000/workshop/getWorkshop').then(response =>{
            this.setState({workshops:response.data})
        } )

    }

    deleteUser(id){
        axios.delete(`http://localhost:5000/admin/users/${id}`).then(res => alert(res.data.msg))
    }


    editUser(id){
        this.props.history.push(`/updateUser/${id}`);
    }

    render() {
        return (
            <div>
                <Header   />
                <div className="Row">
                    <h1 className="text-center" style={{ marginTop:"200PX"}}>Workshop Details</h1>
                    <table className="table table-striped table-bordered" style={{width:"1430px",marginLeft:"10px", marginTop:"20PX"}}>

                        <thead>
                        <tr>
                            <th>name</th>
                            <th>university</th>
                            <th>mobileNumber</th>
                            <th>topic</th>
                            <th>statementOfIntrest</th>
                            <th>status</th>

                        </tr>
                        </thead>



                        <tbody>
                        {
                            this.state.workshops.map(
                                workshop =>{
                                    if (workshop.status === 'approved') {
                                return(
                                    <tr key ={workshop._id}>
                                        <td>{workshop.name}</td>
                                        <td>{workshop.university}</td>
                                        <td>{workshop.mobileNumber}</td>
                                        <td>{workshop.topic }</td>
                                        <td>{workshop.statementOfIntrest}</td>
                                        <td>{workshop.status}</td>



                                    </tr>)}}
                            )
                        }


                        </tbody>

                    </table>

                </div>
            </div>
        )
    }
}

export default AvailableWorkshop