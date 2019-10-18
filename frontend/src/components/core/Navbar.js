import React, {Component} from "react";
import Link from "react-router-dom/Link";
import {connect} from "react-redux";
import {setActiveNavbarItem} from "../../actions/navbarActions";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
    AD_PAGE,
    ADVERTISER_PAGE,
    CHECK_PAGE,
    CONTRACT_PAGE,
    LOGIN_PAGE,
    PASSPORT_PAGE,
    SELLER_PAGE
} from "../../actions/types";
import {AuthenticationService} from "../../service/AuthenticationService";
import {logout} from "../../actions/loginActions";

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {active: props.active};
        this.logout = this.logout.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn !== undefined && !nextProps.isLoggedIn && nextProps.active !== LOGIN_PAGE) {
            this.context.router.history.replace("/");
        }
        if (nextProps.active !== undefined && nextProps.active !== this.state.active) {
            this.setState({
                active: nextProps.active
            });
        }
    }

    logout() {
        this.props.logout()
    }

    navbar() {
        if (this.state.active !== LOGIN_PAGE && AuthenticationService.isUserLoggedIn()) {
            return (
                <div className="container">
                    <a className="navbar-brand" href="#">Рекламное агенство</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className={classnames("nav-item", {"active": this.state.active === AD_PAGE})}>
                                <Link className="nav-link" to="/ads">Реклама</Link>
                            </li>
                            <li className={classnames("nav-item", {"active": this.state.active === CONTRACT_PAGE})}>
                                <Link className="nav-link" to="/contracts">Контракты</Link>
                            </li>
                            <li className={classnames("nav-item", {"active": this.state.active === ADVERTISER_PAGE})}>
                                <Link className="nav-link" to="/advertisers">Рекламодатели</Link>
                            </li>
                            <li className={classnames("nav-item", {"active": this.state.active === SELLER_PAGE})}>
                                <Link className="nav-link" to="/sellers">Продавцы</Link>
                            </li>
                            <li className={classnames("nav-item", {"active": this.state.active === CHECK_PAGE})}>
                                <Link className="nav-link" to="/checks">Чеки</Link>
                            </li>
                            <li className={classnames("nav-item", {"active": this.state.active === PASSPORT_PAGE})}>
                                <Link className="nav-link" to="/passports">Паспорта</Link>
                            </li>
                        </ul>
                    </div>
                    <button className="btn btn-primary my-2" onClick={this.logout}>Выйти</button>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <a className="navbar-brand" href="#">Рекламное агенство</a>
                </div>
            )
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm sticky-top navbar-dark bg-primary mb-4 pr-0">
                {this.navbar()}
            </nav>
        )
    }
}

Navbar.propTypes = {
    active: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func
};

Navbar.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.shape({replace: PropTypes.func.isRequired}).isRequired
    }).isRequired
};

const mapStateToProps = state => ({
    active: state.navbarReducer.active,
    isLoggedIn: state.loginReducer.isLoggedIn
});

export default connect(
    mapStateToProps,
    {setActiveNavbarItem, logout}
)(Navbar);