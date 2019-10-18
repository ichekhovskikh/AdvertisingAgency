import {connect} from "react-redux";
import {updatePassport} from "../../actions/passportActions";
import PassportDialog from "./PassportDialog";
import PropTypes from "prop-types";
import {GET_ALL_PASSPORTS} from "../../actions/types";

class UpdatePassportDialog extends PassportDialog {

    saveRequest() {
        let passport = {
            passportId: this.state.passportId,
            fullName: this.state.fullName,
            series: this.state.series,
            number: this.state.number
        };
        this.props.updatePassport(passport);
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_PASSPORTS) {
            this.onHide();
        }
    }
}

UpdatePassportDialog.propTypes = {
    deprecated: PropTypes.string
};

const mapStateToProps = state => ({
    deprecated: state.passportReducer.deprecated
});

export default connect(
    mapStateToProps,
    {updatePassport}
)(UpdatePassportDialog);
