import React from 'react'
import {Link  } from 'react-router-dom'

import './header.css'


function ReviewerHeader() {
    

      return (
       <header>





            <Link to="/"> <b>Reviewer UI  </b></Link>
            <Link to="/"> <b>HOME  </b></Link>

        <Link to="/ReviewerViewWorkshop"> <b>View Workshop </b></Link>




</header>

      )

}

export default ReviewerHeader
