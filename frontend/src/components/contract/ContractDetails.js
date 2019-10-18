import React from "react";
import {Link} from "react-router-dom";
import ContractItem from "./ContractItem";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getContract} from "../../actions/contractActions";
import {CONTRACT_PAGE, GET_ALL_CONTRACTS, TRY_LOGIN} from "../../actions/types";
import {setActiveNavbarItem} from "../../actions/navbarActions";
import {NeedAuthComponent} from "../core/NeedAuthComponent";

class ContractDetails extends NeedAuthComponent {

    constructor(props) {
        super(props);
        this.props.setActiveNavbarItem(CONTRACT_PAGE);
        this.state = {contract: {}}
    }

    componentDidMount() {
        this.refreshContract()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_CONTRACTS) {
            this.refreshContract();
        } else if (nextProps.deprecated !== undefined && nextProps.deprecated === TRY_LOGIN) {
            this.props.history.replace("/");
        } else if (nextProps.contract !== undefined && !nextProps.contract) {
            this.props.history.replace("/contracts");
        } else if (nextProps.contract !== undefined && this.state.contract !== nextProps.contract) {
            this.setState({contract: nextProps.contract})
        }
    }

    refreshContract() {
        const {contract_id} = this.props.match.params;
        this.props.getContract(contract_id);
    }

    renderIfAuth() {
        let contractElement = <div/>;
        if (this.state.contract !== undefined && this.state.contract.contractId !== undefined) {
            contractElement = <ContractItem contract={this.state.contract}/>
        }
        return (
            <React.Fragment>
                <Link to="/contracts"
                      id="toContracts"
                      className="btn btn-primary shadow p-3 mb-3 rounded btn-lg btn-block">
                    показать все
                </Link>
                {contractElement}
            </React.Fragment>
        )
    }
}

ContractDetails.propTypes = {
    contract: PropTypes.array.isRequired,
    getContract: PropTypes.func.isRequired,
    deprecated: PropTypes.string
};

const mapStateToProps = state => ({
    contract: state.contractReducer.contract,
    deprecated: state.contractReducer.deprecated
});

export default connect(
    mapStateToProps,
    {getContract, setActiveNavbarItem}
)(ContractDetails);
