import React, { PureComponent } from 'react'
import axios from 'axios'
import '../Registration/login.css'
import Header from '../header/myheader'
import {API_URL} from "../utils/url";

class Payment extends PureComponent {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state = {
            cardName:'',
            cardNumber:'',
            cvv:'',
            cardExpire:''
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e){
        e.preventDefault();
        const email =this.props.match.params.email;
        try {
            const users={
                cardName:this.state.cardName,
                cardNumber:this.state.cardNumber,
                cvv:this.state.cvv,
                cardExpire:this.state.cardExpire,
                contactDetails:email
            }
            axios.post('${API_URL}/payment/addPayment',users).then(res => alert(res.data.msg) )
            this.props.history.push('/')
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    render() {
        return (
            <div>
                <Header/>
                <div className="login-page"    style={{  height: 600,marginTop:100}}>
                    <h1>Payment Form</h1>
                    <form  onSubmit={this.onSubmit}>
                        <input   type='text'   placeholder="Name on card" name="cardName" value={this.state.cardName} onChange={this.onChange} />
                        <input type='number'  placeholder="Card Number"  name="cardNumber"  value={this.state.cardNumber}  onChange={this.onChange}/>
                        <input type='number'   placeholder="cvv" name="cvv"  value={this.state.cvv}  onChange={this.onChange}/>
                        <input type='number'   placeholder="card Expire" name="cardExpire"  value={this.state.cardExpire}  onChange={this.onChange}/>
                        <div className="row">
                            <button type="submit">submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Payment