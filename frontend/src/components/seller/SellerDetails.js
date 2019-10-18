import React from "react";
import {Link} from "react-router-dom";
import SellerItem from "./SellerItem";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getSeller} from "../../actions/sellerActions";
import {GET_ALL_SELLERS, SELLER_PAGE, TRY_LOGIN} from "../../actions/types";
import {setActiveNavbarItem} from "../../actions/navbarActions";
import {NeedAuthComponent} from "../core/NeedAuthComponent";

class SellerDetails extends NeedAuthComponent {

    constructor(props) {
        super(props);
        this.props.setActiveNavbarItem(SELLER_PAGE);
        this.state = {seller: {}}
    }

    componentDidMount() {
        this.refreshSeller()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_SELLERS) {
            this.refreshSeller();
        } else if (nextProps.deprecated !== undefined && nextProps.deprecated === TRY_LOGIN) {
            this.props.history.replace("/");
        } else if (nextProps.seller !== undefined && !nextProps.seller) {
            this.props.history.replace("/sellers");
        } else if (nextProps.seller !== undefined && this.state.seller !== nextProps.seller) {
            this.setState({seller: nextProps.seller})
        }
    }

    refreshSeller() {
        const {seller_id} = this.props.match.params;
        this.props.getSeller(seller_id);
    }

    renderIfAuth() {
        let sellerElement = <div/>;
        if (this.state.seller !== undefined && this.state.seller.sellerId !== undefined) {
            sellerElement = <SellerItem seller={this.state.seller}/>
        }
        return (
            <React.Fragment>
                <Link to="/sellers"
                      id="toSellers"
                      className="btn btn-primary shadow p-3 mb-3 rounded btn-lg btn-block">
                    показать все
                </Link>
                {sellerElement}
            </React.Fragment>
        )
    }
}

SellerDetails.propTypes = {
    seller: PropTypes.array.isRequired,
    getSeller: PropTypes.func.isRequired,
    deprecated: PropTypes.string
};

const mapStateToProps = state => ({
    seller: state.sellerReducer.seller,
    deprecated: state.sellerReducer.deprecated
});

export default connect(
    mapStateToProps,
    {getSeller, setActiveNavbarItem}
)(SellerDetails);
