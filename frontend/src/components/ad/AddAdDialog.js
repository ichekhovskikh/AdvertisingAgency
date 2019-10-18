import AdDialog from "./AdDialog";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addAd} from "../../actions/adActions";
import {GET_ALL_ADS} from "../../actions/types";

class AddAdDialog extends AdDialog {

    saveRequest() {
        let ad = {
            adName: this.state.adName,
            price: this.state.price,
            duration: this.state.duration
        };
        this.props.addAd(ad);
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_ADS) {
            this.onHide();
        }
    }
}

AddAdDialog.propTypes = {
    deprecated: PropTypes.string
};

const mapStateToProps = state => ({
    deprecated: state.adReducer.deprecated
});

export default connect(
    mapStateToProps,
    {addAd}
)(AddAdDialog);
