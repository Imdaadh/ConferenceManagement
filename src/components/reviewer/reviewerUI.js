import React, { PureComponent } from 'react'
import Header from './header/reviewerHeader'

class ReviewerUI extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <h1>welcome Reviewer</h1>

            </div>
        )
    }
}

export default ReviewerUI