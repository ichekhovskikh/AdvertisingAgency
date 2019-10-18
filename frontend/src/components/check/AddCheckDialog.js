import CheckDialog from "./CheckDialog";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addCheck} from "../../actions/checkActions";
import {GET_ALL_CHECKS} from "../../actions/types";

class AddCheckDialog extends CheckDialog {

    saveRequest() {
        let check = {
            price: this.state.price,
            nds: this.state.nds,
            tax: this.state.tax
        };
        this.props.addCheck(check);
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_CHECKS) {
            this.onHide();
        }
    }
}

AddCheckDialog.propTypes = {
    deprecated: PropTypes.string
};

const mapStateToProps = state => ({
    deprecated: state.checkReducer.deprecated
});

export default connect(
    mapStateToProps,
    {addCheck}
)(AddCheckDialog);
