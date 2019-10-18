import {connect} from "react-redux";
import {updateAd} from "../../actions/adActions";
import AdDialog from "./AdDialog";
import PropTypes from "prop-types";
import {GET_ALL_ADS} from "../../actions/types";

class UpdateAdDialog extends AdDialog {

    saveRequest() {
        let ad = {
            adId: this.state.adId,
            adName: this.state.adName,
            price: this.state.price,
            duration: this.state.duration
        };
        this.props.updateAd(ad);
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_ADS) {
            this.onHide();
        }
    }
}

UpdateAdDialog.propTypes = {
    deprecated: PropTypes.string
};

const mapStateToProps = state => ({
    deprecated: state.adReducer.deprecated
});

export default connect(
    mapStateToProps,
    {updateAd}
)(UpdateAdDialog);
