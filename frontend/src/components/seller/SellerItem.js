import React, {Component} from "react";
import PropTypes from "prop-types";
import UpdateSellerDialog from "./UpdateSellerDialog";
import {connect} from "react-redux";
import {removeSeller} from "../../actions/sellerActions";
import {Link} from "react-router-dom";

class SellerItem extends Component {

    constructor(props) {
        super(props);
        this.state = {show: false, seller: props.seller};
        this.onShow = this.onShow.bind(this);
        this.onHideUpdateSeller = this.onHideUpdateSeller.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.seller !== undefined && this.state.seller !== nextProps.seller) {
            this.setState({seller: nextProps.seller})
        }
    }

    onShow() {
        this.setState({show: true});
    }

    onHideUpdateSeller() {
        this.setState({
            show: false
        })
    }

    onRemove() {
        this.props.removeSeller(this.state.seller.sellerId)
    }

    render() {
        return (
            <div>
                <div className="container shadow mb-3 py-2 bg-white rounded">
                    <div className="row pr-2">
                        <Link className="col-auto mr-auto pt-1 text-dark"
                              to={"/passport/" + this.state.seller.passport.passportId}>
                            <h3>{this.state.seller.passport.fullName}</h3>
                        </Link>
                        <button type="button" className="col-auto btn btn-link btn-sm" onClick={this.onShow}>
                            Редактировать
                        </button>
                        <button type="button" className="col-auto btn btn-link btn-sm" onClick={this.onRemove}>
                            Удалить
                        </button>
                    </div>
                    <hr/>
                    <div className="row">
                        <h5 className="col-auto text-secondary">Телефон: {this.state.seller.phone}</h5>
                        <h5 className="col-auto text-secondary">Почта: {this.state.seller.mail}</h5>
                    </div>
                </div>
                <UpdateSellerDialog
                    title="Редактирование"
                    show={this.state.show}
                    onHide={this.onHideUpdateSeller}
                    seller={this.state.seller}/>
            </div>
        )
    }
}

SellerItem.propTypes = {
    seller: PropTypes.object.isRequired,
    removeSeller: PropTypes.func.isRequired
};

export default connect(
    null,
    {removeSeller}
)(SellerItem);