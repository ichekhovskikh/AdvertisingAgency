import React from "react";
import ContractItem from "./ContractItem";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addContract, getAllContracts} from "../../actions/contractActions";
import AddContractDialog from "./AddContractDialog";
import {CONTRACT_PAGE, GET_ALL_CONTRACTS, TRY_LOGIN} from "../../actions/types";
import {setActiveNavbarItem} from "../../actions/navbarActions";
import {NeedAuthComponent} from "../core/NeedAuthComponent";
import SearchForm from "../core/SearchForm";

class AllContracts extends NeedAuthComponent {

    constructor(props) {
        super(props);
        this.props.setActiveNavbarItem(CONTRACT_PAGE);
        this.state = {
            show: false,
            search: undefined,
            sort: 'asc'
        };
        this.onAdd = this.onAdd.bind(this);
        this.onHideAddContract = this.onHideAddContract.bind(this);
        this.onChanged = this.onChanged.bind(this);
    }

    componentDidMount() {
        this.props.getAllContracts(this.state.search, this.state.sort);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_CONTRACTS) {
            this.props.getAllContracts(this.state.search, this.state.sort);
        } else if (nextProps.deprecated !== undefined && nextProps.deprecated === TRY_LOGIN) {
            this.props.history.replace("/");
        }
    }

    onChanged(search, sort) {
        this.state.search = search;
        this.state.sort = sort;
        this.props.getAllContracts(search, sort);
    }

    onAdd() {
        this.setState({
            show: true
        })
    }

    onHideAddContract() {
        this.setState({
            show: false
        })
    }

    renderIfAuth() {
        let contracts = this.props.contracts;
        let contractElements = [];
        if (contracts !== undefined && contracts !== null) {
            contractElements = this.props.contracts.map(contract => (
                <ContractItem key={contract.contractId} contract={contract}/>));
        }
        return (
            <React.Fragment>
                <SearchForm onChanged={this.onChanged}/>
                <button type="button" className="btn btn-primary shadow p-3 mb-3 rounded btn-lg btn-block"
                        onClick={this.onAdd}>
                    + добавить
                </button>
                {contractElements}
                <AddContractDialog title="Добавление" show={this.state.show} onHide={this.onHideAddContract}/>
            </React.Fragment>
        )
    }
}

AllContracts.propTypes = {
    contracts: PropTypes.array.isRequired,
    getAllContracts: PropTypes.func.isRequired,
    addContract: PropTypes.func.isRequired,
    deprecated: PropTypes.string
};

const mapStateToProps = state => ({
    contracts: state.contractReducer.contracts,
    deprecated: state.contractReducer.deprecated
});

export default connect(
    mapStateToProps,
    {getAllContracts, addContract, setActiveNavbarItem}
)(AllContracts);
