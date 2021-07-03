import React, { PureComponent } from 'react'
import axios from 'axios'
import Header from "../header/myheader";
import {API_URL} from "../utils/url";

class UpdateConference extends PureComponent {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state = {
            name:'',
            time:'',
            date:'',
            venue:'',
            users:[]
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    componentDidMount = () =>{
        const id =this.props.match.params._id;
        axios.get('https://afprojectconference.herokuapp.com/conference/conference/${id}').then(res =>{
            this.setState({
                name:res.data.name,
                time:res.data.time,
                date:res.data.date,
                venue:res.data.venue
            })
        } )
    }
    onSubmit(e){
        e.preventDefault();
        try {
            const users={
                name:this.state.name,
                time:this.state.time,
                date:this.state.date,
                venue:this.state.venue,
                status:'pending'
            }
            axios.put('https://afprojectconference.herokuapp.com/conference/editConference/${this.props.match.params._id}',users).then(res => alert(res.data.msg))
            this.props.history.push('/editorViewConference')
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    render() {
        return (
            <div>
                <Header/>
                <div className="login-page"    style={{  height: 900,marginTop:100}}>
                    <h1>UPDATE CONFERENCE </h1>
                    <form  onSubmit={this.onSubmit}>
                        <p>Name  <input type='text'  name="name" value={this.state.name} onChange={this.onChange} /></p>
                        <p>Time  <input type='text'  name="time"  value={this.state.time}  onChange={this.onChange}/></p>
                        <p>DATE  <input type='text'  name="date"  value={this.state.date}  onChange={this.onChange}/></p>
                        <p>Venue  <input type='text'  name="venue"  value={this.state.venue}  onChange={this.onChange}/></p>
                        <div className="row">
                        <button type="submit">update</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default UpdateConference