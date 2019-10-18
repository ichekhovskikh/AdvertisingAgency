import React, {Component} from "react";
import {AuthenticationService} from "../../service/AuthenticationService";

export class NeedAuthComponent extends Component {

    constructor(props) {
        super(props);
        if (!AuthenticationService.isUserLoggedIn()) {
            this.props.history.replace("/");
        }
    }

    renderIfAuth() {
        return (
            <React.Fragment>
                <div className="container">
                </div>
            </React.Fragment>
        );
    }

    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return (
                <div className="container">
                    {this.renderIfAuth()}
                </div>
            )
        } else {
            return (
                <div className="container"/>
            )
        }
    }
}