import PassportDialog from "./PassportDialog";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addPassport} from "../../actions/passportActions";
import {GET_ALL_PASSPORTS} from "../../actions/types";

class AddPassportDialog extends PassportDialog {

    saveRequest() {
        let passport = {
            fullName: this.state.fullName,
            series: this.state.series,
            number: this.state.number
        };
        this.props.addPassport(passport);
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_PASSPORTS) {
            this.onHide();
        }
    }
}

AddPassportDialog.propTypes = {
    deprecated: PropTypes.string
};

const mapStateToProps = state => ({
    deprecated: state.passportReducer.deprecated
});

export default connect(
    mapStateToProps,
    {addPassport}
)(AddPassportDialog);
