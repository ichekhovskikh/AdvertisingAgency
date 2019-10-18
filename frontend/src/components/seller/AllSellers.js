import React from "react";
import SellerItem from "./SellerItem";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addSeller, getAllSellers} from "../../actions/sellerActions";
import AddSellerDialog from "./AddSellerDialog";
import {GET_ALL_SELLERS, SELLER_PAGE, TRY_LOGIN} from "../../actions/types";
import {setActiveNavbarItem} from "../../actions/navbarActions";
import {NeedAuthComponent} from "../core/NeedAuthComponent";
import SearchForm from "../core/SearchForm";

class AllSellers extends NeedAuthComponent {

    constructor(props) {
        super(props);
        this.props.setActiveNavbarItem(SELLER_PAGE);
        this.state = {
            show: false,
            search: undefined,
            sort: 'asc'
        };
        this.onAdd = this.onAdd.bind(this);
        this.onHideAddSeller = this.onHideAddSeller.bind(this);
        this.onChanged = this.onChanged.bind(this);
    }

    componentDidMount() {
        this.props.getAllSellers(this.state.search, this.state.sort);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_SELLERS) {
            this.props.getAllSellers(this.state.search, this.state.sort);
        } else if (nextProps.deprecated !== undefined && nextProps.deprecated === TRY_LOGIN) {
            this.props.history.replace("/");
        }
    }

    onChanged(search, sort) {
        this.state.search = search;
        this.state.sort = sort;
        this.props.getAllSellers(search, sort);
    }

    onAdd() {
        this.setState({
            show: true
        })
    }

    onHideAddSeller() {
        this.setState({
            show: false
        })
    }

    renderIfAuth() {
        let sellers = this.props.sellers;
        let sellerElements = [];
        if (sellers !== undefined && sellers !== null) {
            sellerElements = this.props.sellers.map(seller => (
                <SellerItem key={seller.sellerId} seller={seller}/>));
        }
        return (
            <React.Fragment>
                <SearchForm onChanged={this.onChanged}/>
                <button type="button" className="btn btn-primary shadow p-3 mb-3 rounded btn-lg btn-block"
                        onClick={this.onAdd}>
                    + добавить
                </button>
                {sellerElements}
                <AddSellerDialog title="Добавление" show={this.state.show} onHide={this.onHideAddSeller}/>
            </React.Fragment>
        )
    }
}

AllSellers.propTypes = {
    sellers: PropTypes.array.isRequired,
    getAllSellers: PropTypes.func.isRequired,
    addSeller: PropTypes.func.isRequired,
    deprecated: PropTypes.string
};

const mapStateToProps = state => ({
    sellers: state.sellerReducer.sellers,
    deprecated: state.sellerReducer.deprecated
});

export default connect(
    mapStateToProps,
    {getAllSellers, addSeller, setActiveNavbarItem}
)(AllSellers);
