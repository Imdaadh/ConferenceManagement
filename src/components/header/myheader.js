import React from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import decode from 'jwt-decode';


class Myheader extends React.Component{

    state={
        user:'',
        email:''
    }

    doLogout() {

        sessionStorage.clear()
        window.location = '/'

    }


    componentDidMount() {

        if(sessionStorage.token){
            this.setState({user:decode(sessionStorage.token).role})
            this.setState({email:decode(sessionStorage.token).email})
        }

    }

    isAuth() {


        if (this.state.user==='admin') {
            return (
                <div>
                    <li className="menu-active"><a href="#">AdminUI</a></li>
                    <li><a href="/adminViewConference">View Conference</a> </li>
                    <li><a href="/adminViewWorkshop" >View Workshop</a></li>
                    <li><a href="/adminViewRP">View ResearchPaper </a></li>
                    <li><a href="/admin-view">View Users </a></li>
                    <li className="buy-tickets"  onClick={this.doLogout}><a href="/">Logout</a></li>
                </div>
            )
        } else if(this.state.user==='editor') {
            return (
                <div>
                    <li className="menu-active"><a href="#">Editor UI</a></li>

                    <li><a href="/addConference">Add Conference </a> </li>
                    <li><a href="/editorViewConference" >View Conference</a></li>
                    <li className="buy-tickets"  onClick={this.doLogout}><a href="/">Logout</a></li>
                </div>
            )
        }
        else if(this.state.user==='workshop presenter') {
            return (
                <div>
                    {console.log("aaaaa"+this.state.email)}
                    <li className="menu-active"><a href="/">Home</a></li>
                    <li><a href="/aboutUs">About Us</a></li>
                    <li><a href='/addWorkshop'> ADD WORKSHOP </a> </li>
                    <li><a href="/userViewWorkshop"> VIEW WORKSHOP</a> </li>
                    <li className="buy-tickets"  onClick={this.doLogout}><a href="/">Logout</a></li>
                </div>


            )
        }  else if(this.state.user==='researcher') {
            return (
                <div>
                    <li className="menu-active"><a href="/">Home</a></li>
                    <li><a href="/aboutUs">About Us</a></li>
                    <li><a href="/userAddRP"> ADD FILE</a> </li>
                    <li><a href="/userViewRP"> VIEW FILE</a> </li>
                    <li className="buy-tickets"  onClick={this.doLogout}><a href="/">Logout</a></li>

                </div>


            )
        } else if(this.state.user==='reviewer') {
            return (
                <div>
                    <li className="menu-active"><a href="#">reviewer UI</a></li>
                    <li><a href="/ReviewerViewWorkshop"> Workshop</a> </li>
                    <li><a href="/reviewerViewRP"> RESEARCH PAPER</a> </li>
                    <li><a href="/reviewerViewTemplate"> TEMPLATES </a> </li>
                    <li className="buy-tickets"  onClick={this.doLogout}><a href="/">Logout</a></li>
                </div>


            )
        }

        else {
            return (
                <div>
                    <li className="menu-active"><a href="/">Home</a></li>
                    <li><a href="/aboutUs">About Us</a></li>
                    <li><a href="/viewWorkshop1">Workshop</a></li>
                    <li><a href="/viewFile" >Templates</a></li>
                    <li><a href="/viewHomeResearchPaper">ResearchPaper</a></li>
                    <li className="buy-tickets"><a href="/registration">REGISTER</a></li>
                    <li className="buy-tickets"><a href="/login">LOGIN</a></li>
                </div>
            )
        }

    }







    render() {
        return(
            <div  >

                <header id="header" style={{backgroundColor:"black"}}>
                    <div className="container">

                        <div id="logo" className="pull-left">

                            <img src="assets/img/logo.png" alt="" title="" style={{width:"100px",marginLeft:"100px",maxHeight:"2000px",marginBottom:"800px",marginTop:"-30px"}}></img>


                        </div>

                        <nav id="nav-menu-container" >
                            <ul className="nav-menu"  style={{color:"red"}} >
                                {this.isAuth()}
                            </ul>
                        </nav>

                    </div>
                </header>

            </div>

        )
    }
}
export default Myheader