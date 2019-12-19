import React, { Component } from 'react'

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount(){
        this.setState({
            ...this.state,
            user : {...this.props.loggedInUser}
        });
    }
    render() {
        return (
            <React.Fragment>
                <h1></h1>
            </React.Fragment>
        )
    }
}
