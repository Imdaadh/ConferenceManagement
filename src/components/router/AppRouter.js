
import {BrowserRouter as Router ,Route, Switch} from "react-router-dom";
import Registration from '../Registration/registration';
import UpdateRegistration from '../admin/updateuser';
import Payment1 from '../payment/researchpaperpayment';
import Payment from '../payment/payment';
import AboutUs from '../aboutUs/aboutUs';
import Login from '../Registration/login';




// user imports

import CreateWorkshop from '../workshop/createWorkshop';
import UserViewWorkshop from '../Users/viewWorkshop'
import ADDWorkshop from '../Users/addWorkshop'
import UserViewRP from '../Users/userViewResearchPaper'
import UserAddFile from '../Users/userAddFile'





// editor imports
import EditorUI from '../Editors/editorUI';
import EditorViewConference from '../Editors/editorViewConference';
import AddConference from '../Editors/createConferece';
import UpdateConference from '../Editors/updateConference';

// admin imports
import AdminUI from '../admin/adminUI';
import AdminViewConference from '../admin/viewConference';
import AdminViewUsers from '../admin/adminViewUsers';
import AdminViewResearchPaper from '../admin/adminViewResearchPaper';
import AdminViewWorkshop from '../admin/AdminviewWorkshop';
import AdminViewRP from '../admin/adminViewResearchPaper';


// reviewer imports
import ReviwerUI from '../reviewer/reviewerUI';
import ReviewerViewWorkshop from '../reviewer/reviewerViewWorkshop';
import AddFile from '../reviewer/addFile';
import HomeResearchPaper from '../reviewer/homeResearchPaper';
import HomeFileTemplates from '../reviewer/homeFileTemplates';
import ReviewerViewRP from '../reviewer/reviewerViewResearchPaper';
import ViewFilesTemplate from '../reviewer/viewFilesTemplate';
import AddFileTemplate from '../reviewer/addFileTemplate';

//landing page
import Landingpage from "../landingpage/landingpage";
import ViewWorkshop1 from "../workshop/homeviewWorkshop";
import React from "react";
import decode from "jwt-decode";


class AppRouter extends React.Component{

        state={
                isLogged:''
        }
        componentDidMount() {
                if(sessionStorage.token){
                        this.setState({isLogged:decode(sessionStorage.token).role})
                }

        }






        render() {
                        return(
                            <Switch>
                                    <Route path="/"  exact component={Landingpage}></Route>
                                    <Route path="/registration" component={Registration}></Route>
                                    <Route path="/updateUser/:_id" component={UpdateRegistration}></Route>



                                    <Route path="/login" component={Login}></Route>
                                    <Route path="/aboutUs" component={AboutUs}></Route>

                                    {/*user route*/}

                                    <Route path="/addWorkshop/:email" component={CreateWorkshop}></Route>
                                    <Route path="/addWorkshop" component={ADDWorkshop}></Route>
                                    <Route path="/viewWorkshop1" component={ViewWorkshop1}></Route>
                                    <Route path="/userViewWorkshop" component={UserViewWorkshop}></Route>
                                    <Route path="/userViewRP" component={UserViewRP}></Route>
                                    <Route path="/userAddRP" component={UserAddFile}></Route>




                                   <Route path="/payment/:email" component={Payment}></Route>
                                <Route path="/payment" component={Payment}></Route>
                                <Route path="/payment1" component={Payment1}></Route>

                                    {/*admin route*/}
                                     <Route path="/adminUI" component={ AdminUI }></Route>
                                    <Route path="/adminViewConference" component={ AdminViewConference }></Route>
                                    <Route path="/admin-view" component={ AdminViewUsers   }></Route>
                                    <Route path="/adminViewResearchPaper" component={AdminViewResearchPaper  }></Route>
                                {/*<Route path="/adminViewResearchPaper" component={ this.state.isLogged ? AdminViewResearchPaper  : Login }></Route>*/}
                                    <Route path="/adminViewWorkshop" component={  AdminViewWorkshop   }></Route>
                                <Route path="/adminViewRP" component={  AdminViewRP    }></Route>


                                    {/*reviewer route*/}
                                    <Route path="/reviwerUI" component={ReviwerUI   }></Route>
                                    <Route path="/reviewerViewWorkshop" component={ ReviewerViewWorkshop    }></Route>
                                    <Route path="/addFile" component={ AddFile }></Route>
                                    <Route path="/viewFile" component={  HomeFileTemplates    }></Route>
                                    <Route path="/viewHomeResearchPaper" component={  HomeResearchPaper    }></Route>
                                    <Route path="/reviewerViewRP" component={  ReviewerViewRP    }></Route>
                                    <Route path="/reviewerViewTemplate" component={ ViewFilesTemplate    }></Route>
                                    <Route path="/addFileTemplate" component={ AddFileTemplate }></Route>





                                {/*editor route*/}
                                    <Route path="/editorUI" component={   HomeFileTemplates      }></Route>
                                    <Route path="/addConference" component={AddConference}></Route>
                                    <Route path="/editorViewConference" component={EditorViewConference}></Route>
                                    <Route path="/updateConference/:_id" component={UpdateConference}></Route>


                            </Switch>
                        )
                }
        }

export default AppRouter
