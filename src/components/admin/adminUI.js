import React, { PureComponent } from 'react'
import {Link} from 'react-router-dom'
import decode from 'jwt-decode';

import Header from '../header/myheader'

class AdminUI extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            user:''
        }
    }
    componentDidMount() {

        if(sessionStorage.token){
            this.setState({user:decode(sessionStorage.token).role})
        }

    }

    render() {
        console.log("inside")
    
      
        return (
         
            <div className="App">

                       
                    <Header   />
                   



            <h1>welcome Admin {this.state.user}</h1>





        </div>

        )
    }
}

export default AdminUI