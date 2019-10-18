import React from "react";
import {Link} from "react-router-dom";
import CheckItem from "./CheckItem";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getCheck} from "../../actions/checkActions";
import {CHECK_PAGE, GET_ALL_CHECKS, TRY_LOGIN} from "../../actions/types";
import {setActiveNavbarItem} from "../../actions/navbarActions";
import {NeedAuthComponent} from "../core/NeedAuthComponent";

class CheckDetails extends NeedAuthComponent {

    constructor(props) {
        super(props);
        this.props.setActiveNavbarItem(CHECK_PAGE);
        this.state = {check: {}}
    }

    componentDidMount() {
        this.refreshCheck()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_CHECKS) {
            this.refreshCheck();
        } else if (nextProps.deprecated !== undefined && nextProps.deprecated === TRY_LOGIN) {
            this.props.history.replace("/");
        } else if (nextProps.check !== undefined && !nextProps.check) {
            this.props.history.replace("/checks");
        } else if (nextProps.check !== undefined && this.state.check !== nextProps.check) {
            this.setState({check: nextProps.check})
        }
    }

    refreshCheck() {
        const {check_id} = this.props.match.params;
        this.props.getCheck(check_id);
    }

    renderIfAuth() {
        let checkElement = <div/>;
        if (this.state.check !== undefined && this.state.check.checkId !== undefined) {
            checkElement = <CheckItem check={this.state.check}/>
        }
        return (
            <React.Fragment>
                <Link to="/checks"
                      id="toChecks"
                      className="btn btn-primary shadow p-3 mb-3 rounded btn-lg btn-block">
                    показать все
                </Link>
                {checkElement}
            </React.Fragment>
        )
    }
}

CheckDetails.propTypes = {
    check: PropTypes.array.isRequired,
    getCheck: PropTypes.func.isRequired,
    deprecated: PropTypes.string
};

const mapStateToProps = state => ({
    check: state.checkReducer.check,
    deprecated: state.checkReducer.deprecated
});

export default connect(
    mapStateToProps,
    {getCheck, setActiveNavbarItem}
)(CheckDetails);