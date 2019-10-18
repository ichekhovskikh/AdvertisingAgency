import React, {Component} from "react";
import PropTypes from "prop-types";
import UpdatePassportDialog from "./UpdatePassportDialog";
import {connect} from "react-redux";
import {removePassport} from "../../actions/passportActions";

class PassportItem extends Component {

    constructor(props) {
        super(props);
        this.state = {show: false, passport: props.passport};
        this.onShow = this.onShow.bind(this);
        this.onHideUpdatePassport = this.onHideUpdatePassport.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.passport !== undefined && this.state.passport !== nextProps.passport) {
            this.setState({passport: nextProps.passport})
        }
    }

    onShow() {
        this.setState({show: true});
    }

    onHideUpdatePassport() {
        this.setState({
            show: false
        })
    }

    onRemove() {
        this.props.removePassport(this.state.passport.passportId)
    }

    render() {
        return (
            <div>
                <div className="container shadow mb-3 py-2 bg-white rounded">
                    <div className="row pr-2">
                        <h2 className="col-auto mr-auto pt-1">{this.state.passport.fullName}</h2>
                        <button type="button" className="col-auto btn btn-link btn-sm" onClick={this.onShow}>
                            Редактировать
                        </button>
                        <button type="button" className="col-auto btn btn-link btn-sm" onClick={this.onRemove}>
                            Удалить
                        </button>
                    </div>
                    <hr/>
                    <div className="row">
                        <h5 className="col-auto text-secondary">Серия: {this.state.passport.series}</h5>
                        <h5 className="col-auto text-secondary">Номер: {this.state.passport.number}</h5>
                    </div>
                </div>
                <UpdatePassportDialog
                    title="Редактирование"
                    show={this.state.show}
                    onHide={this.onHideUpdatePassport}
                    passport={this.state.passport}/>
            </div>
        )
    }
}

PassportItem.propTypes = {
    passport: PropTypes.object.isRequired,
    removePassport: PropTypes.func.isRequired
};

export default connect(
    null,
    {removePassport}
)(PassportItem);