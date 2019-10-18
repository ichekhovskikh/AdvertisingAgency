import React, {Component} from "react";
import PropTypes from "prop-types";
import UpdateAdvertiserDialog from "./UpdateAdvertiserDialog";
import {connect} from "react-redux";
import {removeAdvertiser} from "../../actions/advertiserActions";
import {Link} from "react-router-dom";

class AdvertiserItem extends Component {

    constructor(props) {
        super(props);
        this.state = {show: false, advertiser: props.advertiser};
        this.onShow = this.onShow.bind(this);
        this.onHideUpdateAdvertiser = this.onHideUpdateAdvertiser.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.advertiser !== undefined && this.state.advertiser !== nextProps.advertiser) {
            this.setState({advertiser: nextProps.advertiser})
        }
    }

    onShow() {
        this.setState({show: true});
    }

    onHideUpdateAdvertiser() {
        this.setState({
            show: false
        })
    }

    onRemove() {
        this.props.removeAdvertiser(this.state.advertiser.advertiserId)
    }

    render() {
        return (
            <div>
                <div className="container shadow mb-3 py-2 bg-white rounded">
                    <div className="row pr-2">
                        <Link className="col-auto mr-auto pt-1 text-dark"
                              to={"/passport/" + this.state.advertiser.passport.passportId}>
                            <h3>{this.state.advertiser.passport.fullName}</h3>
                        </Link>
                        <button type="button" className="col-auto btn btn-link btn-sm" onClick={this.onShow}>
                            Редактировать
                        </button>
                        <button type="button" className="col-auto btn btn-link btn-sm" onClick={this.onRemove}>
                            Удалить
                        </button>
                    </div>
                    <div className="row">
                        <h5 className="col-auto text-secondary">Телефон: {this.state.advertiser.phone}</h5>
                        <h5 className="col-auto text-secondary">Почта: {this.state.advertiser.mail}</h5>
                    </div>
                    <hr/>
                    <div className="row">
                        <h5 className="col-auto text-secondary">Счет: {this.state.advertiser.checkingAccount}</h5>
                    </div>
                    <div className="row">
                        <h5 className="col-auto text-secondary">ИНН: {this.state.advertiser.inn}</h5>
                    </div>
                </div>
                <UpdateAdvertiserDialog
                    title="Редактирование"
                    show={this.state.show}
                    onHide={this.onHideUpdateAdvertiser}
                    advertiser={this.state.advertiser}/>
            </div>
        )
    }
}

AdvertiserItem.propTypes = {
    advertiser: PropTypes.object.isRequired,
    removeAdvertiser: PropTypes.func.isRequired
};

export default connect(
    null,
    {removeAdvertiser}
)(AdvertiserItem);