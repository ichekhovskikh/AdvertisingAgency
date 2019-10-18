import React, {Component} from "react";
import PropTypes from "prop-types";
import UpdateContractDialog from "./UpdateContractDialog";
import {connect} from "react-redux";
import {removeContract} from "../../actions/contractActions";
import {Link} from "react-router-dom";

class ContractItem extends Component {

    constructor(props) {
        super(props);
        this.state = {show: false, contract: props.contract};
        this.onShow = this.onShow.bind(this);
        this.onHideUpdateContract = this.onHideUpdateContract.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.contract !== undefined && this.state.contract !== nextProps.contract) {
            this.setState({contract: nextProps.contract})
        }
    }

    onShow() {
        this.setState({show: true});
    }

    onHideUpdateContract() {
        this.setState({
            show: false
        })
    }

    onRemove() {
        this.props.removeContract(this.state.contract.contractId)
    }

    render() {
        return (
            <div>
                <div className="container shadow mb-3 py-2 bg-white rounded">
                    <div className="row pr-2">
                        <Link className="col-auto mr-auto pt-1 text-dark"
                              to={"/check/" + this.state.contract.check.checkId}>
                            <h3>Чек №{this.state.contract.check.checkId}</h3>
                        </Link>
                        <button type="button" className="col-auto btn btn-link btn-sm" onClick={this.onShow}>
                            Редактировать
                        </button>
                        <button type="button" className="col-auto btn btn-link btn-sm" onClick={this.onRemove}>
                            Удалить
                        </button>
                    </div>
                    <hr/>
                    <div className="row">
                        <h5 className="col-auto mr-auto text-secondary">
                            Рекламодатель: <Link
                            to={"/advertiser/" + this.state.contract.advertiserId}
                            className="col-auto btn btn-link btn-lg pl-0 pt-1 text-dark">
                            {this.state.contract.advertiser.passport.fullName}
                        </Link>
                        </h5>
                        <h5 className="col-auto text-secondary">
                            Реклама: <Link
                            to={"/ad/" + this.state.contract.adId}
                            className="col-auto btn btn-link btn-lg pl-0 pt-1 pr-0">
                            {this.state.contract.ad.adName}
                        </Link>
                        </h5>
                    </div>
                    <div className="row">
                        <h5 className="col-auto text-secondary">
                            Продавец: <Link
                            to={"/seller/" + this.state.contract.sellerId}
                            className="col-auto btn btn-link btn-lg pl-0 pt-1 text-dark">
                            {this.state.contract.seller.passport.fullName}
                        </Link>
                        </h5>
                    </div>
                </div>
                <UpdateContractDialog
                    title="Редактирование"
                    show={this.state.show}
                    onHide={this.onHideUpdateContract}
                    contract={this.state.contract}/>
            </div>
        )
    }
}

ContractItem.propTypes = {
    contract: PropTypes.object.isRequired,
    removeContract: PropTypes.func.isRequired
};

export default connect(
    null,
    {removeContract}
)(ContractItem);