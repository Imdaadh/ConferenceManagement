import React, { PureComponent } from 'react'
import axios from 'axios'
import Header from "../header/header";
import AvailableWorkshop from "./availableWorkshop";


class AvailableResearchPaper extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            researchPapers:[]
        }
    }


    componentDidMount(){
        axios.get('http://localhost:5000/researchPaper/getResearchPaper').then(response =>{
            this.setState({researchPapers:response.data})
        } )

    }





    editUser(id){
        this.props.history.push(`/updateUser/${id}`);
    }

    render() {
        return (
            <div>
                <Header   />

                <div className="Row">
                    <h1 className="text-center" style={{ marginTop:"200PX"}}>Admin View ResearchPaper </h1>
                    <table className="table table-striped table-bordered" style={{width:"1430px",marginLeft:"10px", marginTop:"20PX"}}>

                        <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>status</th>


                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.researchPapers.map(
                                researchPaper =>
                                    <tr key ={researchPaper._id}>
                                        <td>{researchPaper._id}</td>
                                        <td>{researchPaper.researchPaperName}</td>
                                        <td>{researchPaper.status}</td>




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

export default AvailableResearchPaper