import React, { PureComponent } from 'react'
import axios from 'axios'
import Header from "../header/header";

class Home extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            conferences:[]
        }
    }


    componentDidMount(){
        axios.get('http://localhost:5000/conference/getConference').then(response =>{
            this.setState({conferences:response.data})
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
                <Header/>

                <h1>HOME</h1>

                <div className="Row">
                    <h1 className="text-center" style={{ marginTop:"200PX"}}>Conference Details</h1>
                    <table className="table table-striped table-bordered" style={{width:"1430px",marginLeft:"10px", marginTop:"20PX"}}>

                        <thead>
                        <tr>
                            <th>name</th>
                            <th>time</th>
                            <th>date</th>
                            <th>venue</th>
                            <th>status</th>

                        </tr>
                        </thead>



                        <tbody>
                        {
                            this.state.conferences.map(
                                conference =>{
                                    if (conference.status === 'approved') {
                                        return(
                                        <tr key={conference._id}>
                                            <td>{conference.name}</td>
                                            <td>{conference.time}</td>
                                            <td>{conference.date}</td>
                                            <td>{conference.venue}</td>
                                            <td>{conference.status}</td>



                                        </tr> )}}

                            )
                        }

                        </tbody>

                    </table>

                </div>
            </div>
        )
    }
}

export default Home