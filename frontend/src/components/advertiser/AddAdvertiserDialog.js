import AdvertiserDialog from "./AdvertiserDialog";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addAdvertiser} from "../../actions/advertiserActions";
import {GET_ALL_ADVERTISERS} from "../../actions/types";
import {getAllPassports} from "../../actions/passportActions";

class AddAdvertiserDialog extends AdvertiserDialog {

    saveRequest() {
        let advertiser = {
            passportId: this.state.passportId,
            mail: this.state.mail,
            phone: this.state.phone,
            checkingAccount: this.state.checkingAccount,
            inn: this.state.inn
        };
        this.props.addAdvertiser(advertiser);
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_ADVERTISERS) {
            this.onHide();
        } else if (nextProps.passports !== undefined) {
            this.setState({passports: nextProps.passports})
        }
    }

    requestPassports() {
        this.props.getAllPassports()
    }
}

AddAdvertiserDialog.propTypes = {
    deprecated: PropTypes.string,
    passports: PropTypes.array
};

const mapStateToProps = state => ({
    deprecated: state.advertiserReducer.deprecated,
    passports: state.passportReducer.passports
});

export default connect(
    mapStateToProps,
    {addAdvertiser, getAllPassports}
)(AddAdvertiserDialog);
