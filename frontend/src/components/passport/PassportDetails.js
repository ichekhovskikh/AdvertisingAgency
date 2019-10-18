import React from "react";
import {Link} from "react-router-dom";
import PassportItem from "./PassportItem";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getPassport} from "../../actions/passportActions";
import {GET_ALL_PASSPORTS, PASSPORT_PAGE, TRY_LOGIN} from "../../actions/types";
import {setActiveNavbarItem} from "../../actions/navbarActions";
import {NeedAuthComponent} from "../core/NeedAuthComponent";

class PassportDetails extends NeedAuthComponent {

    constructor(props) {
        super(props);
        this.props.setActiveNavbarItem(PASSPORT_PAGE);
        this.state = {passport: {}}
    }

    componentDidMount() {
        this.refreshPassport()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_PASSPORTS) {
            this.refreshPassport();
        } else if (nextProps.deprecated !== undefined && nextProps.deprecated === TRY_LOGIN) {
            this.props.history.replace("/");
        } else if (nextProps.passport !== undefined && !nextProps.passport) {
            this.props.history.replace("/passports");
        } else if (nextProps.passport !== undefined && this.state.passport !== nextProps.passport) {
            this.setState({passport: nextProps.passport})
        }
    }

    refreshPassport() {
        const {passport_id} = this.props.match.params;
        this.props.getPassport(passport_id);
    }

    renderIfAuth() {
        let passportElement = <div/>;
        if (this.state.passport !== undefined && this.state.passport.passportId !== undefined) {
            passportElement = <PassportItem passport={this.state.passport}/>
        }
        return (
            <React.Fragment>
                <Link to="/passports"
                      id="toPassports"
                      className="btn btn-primary shadow p-3 mb-3 rounded btn-lg btn-block">
                    показать все
                </Link>
                {passportElement}
            </React.Fragment>
        )
    }
}

PassportDetails.propTypes = {
    passport: PropTypes.array.isRequired,
    getPassport: PropTypes.func.isRequired,
    deprecated: PropTypes.string
};

const mapStateToProps = state => ({
    passport: state.passportReducer.passport,
    deprecated: state.passportReducer.deprecated
});

export default connect(
    mapStateToProps,
    {getPassport, setActiveNavbarItem}
)(PassportDetails);