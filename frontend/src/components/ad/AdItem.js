import React, {Component} from "react";
import PropTypes from "prop-types";
import UpdateAdDialog from "./UpdateAdDialog";
import {connect} from "react-redux";
import {removeAd} from "../../actions/adActions";

class AdItem extends Component {

    constructor(props) {
        super(props);
        this.state = {show: false, ad: props.ad};
        this.onShow = this.onShow.bind(this);
        this.onHideUpdateAd = this.onHideUpdateAd.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ad !== undefined && this.state.ad !== nextProps.ad) {
            this.setState({ad: nextProps.ad})
        }
    }

    onShow() {
        this.setState({show: true});
    }

    onHideUpdateAd() {
        this.setState({
            show: false
        })
    }

    onRemove() {
        this.props.removeAd(this.state.ad.adId)
    }

    render() {
        return (
            <div>
                <div className="container shadow mb-3 py-2 bg-white rounded">
                    <div className="row pr-2">
                        <h1 className="col-auto pt-1">{this.state.ad.adName}</h1>
                        <h4 className="col-auto mr-auto bg-danger rounded text-white p-1 my-3">{this.state.ad.price} ₽</h4>
                        <button type="button" className="col-auto btn btn-link btn-sm" onClick={this.onShow}>
                            Редактировать
                        </button>
                        <button type="button" className="col-auto btn btn-link btn-sm" onClick={this.onRemove}>
                            Удалить
                        </button>
                    </div>
                    <hr/>
                    <div className="row">
                        <h5 className="col-auto text-secondary">Количество дней: {this.state.ad.duration}</h5>
                    </div>
                </div>
                <UpdateAdDialog
                    title="Редактирование"
                    show={this.state.show}
                    onHide={this.onHideUpdateAd}
                    ad={this.state.ad}/>
            </div>
        )
    }
}

AdItem.propTypes = {
    ad: PropTypes.object.isRequired,
    removeAd: PropTypes.func.isRequired
};

export default connect(
    null,
    {removeAd}
)(AdItem);