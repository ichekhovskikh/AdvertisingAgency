import {connect} from "react-redux";
import {updateSeller} from "../../actions/sellerActions";
import SellerDialog from "./SellerDialog";
import PropTypes from "prop-types";
import {GET_ALL_SELLERS} from "../../actions/types";
import {getAllPassports} from "../../actions/passportActions";

class UpdateSellerDialog extends SellerDialog {

    saveRequest() {
        let seller = {
            sellerId: this.state.sellerId,
            passportId: this.state.passportId,
            mail: this.state.mail,
            phone: this.state.phone
        };
        this.props.updateSeller(seller);
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_SELLERS) {
            this.onHide();
        } else if (nextProps.passports !== undefined) {
            this.setState({passports: nextProps.passports})
        }
    }

    requestPassports() {
        this.props.getAllPassports()
    }
}

UpdateSellerDialog.propTypes = {
    deprecated: PropTypes.string,
    passports: PropTypes.array
};

const mapStateToProps = state => ({
    deprecated: state.sellerReducer.deprecated,
    passports: state.passportReducer.passports
});

export default connect(
    mapStateToProps,
    {updateSeller, getAllPassports}
)(UpdateSellerDialog);
