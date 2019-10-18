import React from "react";
import CheckItem from "./CheckItem";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addCheck, getAllChecks} from "../../actions/checkActions";
import AddCheckDialog from "./AddCheckDialog";
import {CHECK_PAGE, GET_ALL_CHECKS, TRY_LOGIN} from "../../actions/types";
import {setActiveNavbarItem} from "../../actions/navbarActions";
import {NeedAuthComponent} from "../core/NeedAuthComponent";
import SearchForm from "../core/SearchForm";

class AllChecks extends NeedAuthComponent {

    constructor(props) {
        super(props);
        this.props.setActiveNavbarItem(CHECK_PAGE);
        this.state = {
            show: false,
            search: undefined,
            sort: 'asc'
        };
        this.onAdd = this.onAdd.bind(this);
        this.onHideAddCheck = this.onHideAddCheck.bind(this);
        this.onChanged = this.onChanged.bind(this);
    }

    componentDidMount() {
        this.props.getAllChecks(this.state.search, this.state.sort);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_CHECKS) {
            this.props.getAllChecks(this.state.search, this.state.sort);
        } else if (nextProps.deprecated !== undefined && nextProps.deprecated === TRY_LOGIN) {
            this.props.history.replace("/");
        }
    }

    onChanged(search, sort) {
        this.state.search = search;
        this.state.sort = sort;
        this.props.getAllChecks(search, sort);
    }

    onAdd() {
        this.setState({
            show: true
        })
    }

    onHideAddCheck() {
        this.setState({
            show: false
        })
    }

    renderIfAuth() {
        let checks = this.props.checks;
        let checkElements = [];
        if (checks !== undefined && checks !== null) {
            checkElements = this.props.checks.map(check => (
                <CheckItem key={check.checkId} check={check}/>));
        }
        return (
            <React.Fragment>
                <SearchForm onChanged={this.onChanged}/>
                <button type="button" className="btn btn-primary shadow p-3 mb-3 rounded btn-lg btn-block"
                        onClick={this.onAdd}>
                    + добавить
                </button>
                {checkElements}
                <AddCheckDialog title="Добавление" show={this.state.show} onHide={this.onHideAddCheck}/>
            </React.Fragment>
        )
    }
}

AllChecks.propTypes = {
    checks: PropTypes.array.isRequired,
    getAllChecks: PropTypes.func.isRequired,
    addCheck: PropTypes.func.isRequired,
    deprecated: PropTypes.string
};

const mapStateToProps = state => ({
    checks: state.checkReducer.checks,
    deprecated: state.checkReducer.deprecated
});

export default connect(
    mapStateToProps,
    {getAllChecks, addCheck, setActiveNavbarItem}
)(AllChecks);