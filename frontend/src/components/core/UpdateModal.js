import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from "prop-types";

class UpdateModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            show: false,
            onSave: () => {},
            onHide: () => {}
        };
        this.onSave = this.onSave.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show !== this.state.show) {
            this.setState({
                title: nextProps.title,
                show: nextProps.show,
                onSave: nextProps.onSave,
                onHide: nextProps.onHide
            });
        }
    }

    onSave() {
        this.state.onSave();
    };

    onHide() {
        this.state.onHide();
    };

    render() {
        return (
            <div>
                <Modal size="lg" show={this.state.show} onHide={() => {
                }}>
                    <Modal.Header closeButton onClick={this.onHide}>
                        <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.children}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.onSave}>Сохранить</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

UpdateModal.propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

export default UpdateModal;
