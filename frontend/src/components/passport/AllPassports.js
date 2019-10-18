import React from "react";
import PassportItem from "./PassportItem";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addPassport, getAllPassports} from "../../actions/passportActions";
import AddPassportDialog from "./AddPassportDialog";
import {GET_ALL_PASSPORTS, PASSPORT_PAGE, TRY_LOGIN} from "../../actions/types";
import {setActiveNavbarItem} from "../../actions/navbarActions";
import {NeedAuthComponent} from "../core/NeedAuthComponent";
import SearchForm from "../core/SearchForm";

class AllPassports extends NeedAuthComponent {

    constructor(props) {
        super(props);
        this.props.setActiveNavbarItem(PASSPORT_PAGE);
        this.state = {
            show: false,
            search: undefined,
            sort: 'asc'
        };
        this.onAdd = this.onAdd.bind(this);
        this.onHideAddPassport = this.onHideAddPassport.bind(this);
        this.onChanged = this.onChanged.bind(this);
    }

    componentDidMount() {
        this.props.getAllPassports(this.state.search, this.state.sort);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_PASSPORTS) {
            this.props.getAllPassports(this.state.search, this.state.sort);
        } else if (nextProps.deprecated !== undefined && nextProps.deprecated === TRY_LOGIN) {
            this.props.history.replace("/");
        }
    }

    onChanged(search, sort) {
        this.state.search = search;
        this.state.sort = sort;
        this.props.getAllPassports(search, sort);
    }

    onAdd() {
        this.setState({
            show: true
        })
    }

    onHideAddPassport() {
        this.setState({
            show: false
        })
    }

    renderIfAuth() {
        let passports = this.props.passports;
        let passportElements = [];
        if (passports !== undefined && passports !== null) {
            passportElements = this.props.passports.map(passport => (
                <PassportItem key={passport.passportId} passport={passport}/>));
        }
        return (
            <React.Fragment>
                <SearchForm onChanged={this.onChanged}/>
                <button type="button" className="btn btn-primary shadow p-3 mb-3 rounded btn-lg btn-block"
                        onClick={this.onAdd}>
                    + добавить
                </button>
                {passportElements}
                <AddPassportDialog title="Добавление" show={this.state.show} onHide={this.onHideAddPassport}/>
            </React.Fragment>
        )
    }
}

AllPassports.propTypes = {
    passports: PropTypes.array.isRequired,
    getAllPassports: PropTypes.func.isRequired,
    addPassport: PropTypes.func.isRequired,
    deprecated: PropTypes.string
};

const mapStateToProps = state => ({
    passports: state.passportReducer.passports,
    deprecated: state.passportReducer.deprecated
});

export default connect(
    mapStateToProps,
    {getAllPassports, addPassport, setActiveNavbarItem}
)(AllPassports);