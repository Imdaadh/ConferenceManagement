import React, { PureComponent } from 'react'
import {Link} from 'react-router-dom'
import Header from '../header/myheader'

class EditoeUI extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <div>
                <Header   />
                <h1>welcome Editor</h1>
                <div >
                </div>
            </div>
        )
    }
}

export default EditoeUI