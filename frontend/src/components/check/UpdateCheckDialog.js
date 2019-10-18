import {connect} from "react-redux";
import {updateCheck} from "../../actions/checkActions";
import CheckDialog from "./CheckDialog";
import PropTypes from "prop-types";
import {GET_ALL_CHECKS} from "../../actions/types";

class UpdateCheckDialog extends CheckDialog {

    saveRequest() {
        let check = {
            checkId: this.state.checkId,
            price: this.state.price,
            nds: this.state.nds,
            tax: this.state.tax
        };
        this.props.updateCheck(check);
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_CHECKS) {
            this.onHide();
        }
    }
}

UpdateCheckDialog.propTypes = {
    deprecated: PropTypes.string
};

const mapStateToProps = state => ({
    deprecated: state.checkReducer.deprecated
});

export default connect(
    mapStateToProps,
    {updateCheck}
)(UpdateCheckDialog);
