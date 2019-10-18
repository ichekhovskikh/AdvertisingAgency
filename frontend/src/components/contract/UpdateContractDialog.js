import ContractDialog from "./ContractDialog";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {updateContract} from "../../actions/contractActions";
import {GET_ALL_CONTRACTS} from "../../actions/types";
import {getAllAdvertisers} from "../../actions/advertiserActions";
import {getAllAds} from "../../actions/adActions";
import {getAllSellers} from "../../actions/sellerActions";
import {getAllChecks} from "../../actions/checkActions";

class AddContractDialog extends ContractDialog {

    saveRequest() {
        let contract = {
            contractId: this.state.contractId,
            adId: this.state.adId,
            advertiserId: this.state.advertiserId,
            sellerId: this.state.sellerId,
            checkId: this.state.checkId
        };
        this.props.updateContract(contract);
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_CONTRACTS) {
            this.onHide();
        } else {
            this.setState({
                ads: nextProps.ads,
                advertisers: nextProps.advertisers,
                sellers: nextProps.sellers,
                checks: nextProps.checks,
            })
        }
    }

    sendAdditionalRequests() {
        this.props.getAllAds();
        this.props.getAllAdvertisers();
        this.props.getAllSellers();
        this.props.getAllChecks();
    }
}

AddContractDialog.propTypes = {
    deprecated: PropTypes.string,
    ads: PropTypes.array,
    advertisers: PropTypes.array,
    sellers: PropTypes.array,
    checks: PropTypes.array
};

const mapStateToProps = state => ({
    deprecated: state.contractReducer.deprecated,
    ads: state.adReducer.ads,
    advertisers: state.advertiserReducer.advertisers,
    sellers: state.sellerReducer.sellers,
    checks: state.checkReducer.checks
});

export default connect(
    mapStateToProps,
    {updateContract, getAllAdvertisers, getAllAds, getAllSellers, getAllChecks}
)(AddContractDialog);
