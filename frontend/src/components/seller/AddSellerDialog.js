import SellerDialog from "./SellerDialog";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addSeller} from "../../actions/sellerActions";
import {GET_ALL_SELLERS} from "../../actions/types";
import {getAllPassports} from "../../actions/passportActions";

class AddSellerDialog extends SellerDialog {

    saveRequest() {
        let seller = {
            passportId: this.state.passportId,
            mail: this.state.mail,
            phone: this.state.phone
        };
        this.props.addSeller(seller);
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

AddSellerDialog.propTypes = {
    deprecated: PropTypes.string,
    passports: PropTypes.array
};

const mapStateToProps = state => ({
    deprecated: state.sellerReducer.deprecated,
    passports: state.passportReducer.passports
});

export default connect(
    mapStateToProps,
    {addSeller, getAllPassports}
)(AddSellerDialog);
