import React, {Component} from "react";
import UpdateModal from './UpdateModal';
import PropTypes from "prop-types";

class UpdateDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            show: false
        };
        this.onSave = this.onSave.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show !== this.state.show) {
            this.setState({show: nextProps.show, title: nextProps.title});
        }
    }

    saveRequest() {
        return {success: true, msg: ""}
    }

    validation() {
        return true;
    }

    onHide() {
        this.props.onHide();
        this.setState({show: false});
    }

    onSave() {
        if (!this.validation()) {
            return;
        }
        this.saveRequest();
    }

    dialogBody() {
        return (
            <React.Fragment>
                <div className="container">
                </div>
            </React.Fragment>
        );
    }

    // Example render
    render() {
        return (
            <div>
                <UpdateModal title={this.state.title} show={this.state.show} onHide={this.onHide} onSave={this.onSave}>
                    {this.dialogBody()}
                </UpdateModal>
            </div>
        )
    }
}

UpdateModal.propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func
};

export default UpdateDialog;
