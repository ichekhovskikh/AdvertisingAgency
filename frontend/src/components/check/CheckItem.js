import React, {Component} from "react";
import PropTypes from "prop-types";
import UpdateCheckDialog from "./UpdateCheckDialog";
import {connect} from "react-redux";
import {removeCheck} from "../../actions/checkActions";

class CheckItem extends Component {

    constructor(props) {
        super(props);
        this.state = {show: false, check: props.check};
        this.onShow = this.onShow.bind(this);
        this.onHideUpdateCheck = this.onHideUpdateCheck.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.check !== undefined && this.state.check !== nextProps.check) {
            this.setState({check: nextProps.check})
        }
    }

    onShow() {
        this.setState({show: true});
    }

    onHideUpdateCheck() {
        this.setState({
            show: false
        })
    }

    onRemove() {
        this.props.removeCheck(this.state.check.checkId)
    }

    render() {
        return (
            <div>
                <div className="container shadow mb-3 py-2 bg-white rounded">
                    <div className="row pr-2">
                        <h2 className="col-auto mr-auto pt-1">№{this.state.check.checkId}</h2>
                        <button type="button" className="col-auto btn btn-link btn-sm" onClick={this.onShow}>
                            Редактировать
                        </button>
                        <button type="button" className="col-auto btn btn-link btn-sm" onClick={this.onRemove}>
                            Удалить
                        </button>
                    </div>
                    <hr/>
                    <div className="row">
                        <h5 className="col-auto mr-auto text-secondary">НДС: {this.state.check.nds}%</h5>
                        <h4 className="col-auto text-danger mr-2">{this.state.check.price} ₽</h4>
                    </div>
                    <div className="row">
                        <h5 className="col-auto text-secondary">Налог: {this.state.check.tax}%</h5>
                    </div>
                </div>
                <UpdateCheckDialog
                    title="Редактирование"
                    show={this.state.show}
                    onHide={this.onHideUpdateCheck}
                    check={this.state.check}/>
            </div>
        )
    }
}

CheckItem.propTypes = {
    check: PropTypes.object.isRequired,
    removeCheck: PropTypes.func.isRequired
};

export default connect(
    null,
    {removeCheck}
)(CheckItem);