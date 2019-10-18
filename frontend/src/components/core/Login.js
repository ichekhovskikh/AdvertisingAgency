import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setActiveNavbarItem} from "../../actions/navbarActions";
import {LOGIN_PAGE} from "../../actions/types";
import {registration, tryLogin} from "../../actions/loginActions";
import classnames from "classnames";
import {AuthenticationService} from "../../service/AuthenticationService";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: AuthenticationService.isUserLoggedIn(),
            error: props.error
        };
        if (this.state.isLoggedIn) {
            this.props.history.replace("/ads");
        } else {
            this.props.setActiveNavbarItem(LOGIN_PAGE);
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.register = this.register.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn !== undefined && nextProps.isLoggedIn) {
            this.props.history.replace("/ads");
        } else if (nextProps.isLoggedIn !== undefined) {
            this.setState({
                isLoggedIn: nextProps.isLoggedIn,
                error: nextProps.error
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        this.props.tryLogin(form)
    }

    register() {
        const login = document.getElementById("login").value;
        const password = document.getElementById("password").value;
        this.props.registration(login, password)
    }

    render() {
        return (
            <div className="centered">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="login" className="col col-form-label">Логин</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className={classnames("form-control", {"is-invalid": this.state.error})}
                                id="login"
                                name="login"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password" className="col col-form-label">Пароль</label>
                        <div className="col-sm-10">
                            <input
                                type="password"
                                className={classnames("form-control", {"is-invalid": this.state.error})}
                                id="password"
                                name="password"/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary p-2">Войти</button>
                    <div className="btn btn-outline-primary ml-2 p-2" onClick={this.register}>Зарегистрироваться</div>
                </form>
            </div>
        )
    }
}

Login.propTypes = {
    tryLogin: PropTypes.func,
    registration: PropTypes.func,
    isLoggedIn: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isLoggedIn: state.loginReducer.isLoggedIn,
    error: state.loginReducer.error
});

export default connect(
    mapStateToProps,
    {setActiveNavbarItem, tryLogin, registration}
)(Login);
