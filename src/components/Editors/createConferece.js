import React, { PureComponent } from 'react'
import axios from 'axios'
import './css/createConference.css'
import Header from '../header/myheader'
import {API_URL} from "../utils/url";

class AddConference extends PureComponent {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state = {
            name:'',
            time:'',
            date:'',
            venue:''
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e){
        e.preventDefault();
        try {
                const conference={
                    name:this.state.name,
                    time:this.state.time,
                    date:this.state.date,
                    venue:this.state.venue
        }
        axios.post(`${API_URL}/conference/addConference`,conference).then(res => alert(res.data.msg))
        this.props.history.push('/editorViewConference')
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    render() {
        return (
            <div>
                <Header   />
                <div className="login-page"    style={{  height: 600, marginTop:150}}>
                        <h1>Conference Form</h1>
                        <form  onSubmit={this.onSubmit}>
                            <input type='text'  placeholder="Confenece Name"  name="name" value={this.state.name} onChange={this.onChange} />
                            <input type='text'  placeholder="Confenece time"  name="time"  value={this.state.time}  onChange={this.onChange}/>
                            <input type='date'  placeholder="Confenece date" name="date"  value={this.state.date}  onChange={this.onChange}/>
                            <input type='text'  placeholder="Confenece venue " name="venue"  value={this.state.venue}  onChange={this.onChange}/>
                            <div className="row">
                                <button type="submit">submit</button>
                            </div>
                        </form>
                </div>
            </div>
        )
    }
}
export default AddConference