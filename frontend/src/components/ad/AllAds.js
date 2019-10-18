import React from "react";
import AdItem from "./AdItem";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addAd, getAllAds} from "../../actions/adActions";
import AddAdDialog from "./AddAdDialog";
import {AD_PAGE, GET_ALL_ADS, TRY_LOGIN} from "../../actions/types";
import {setActiveNavbarItem} from "../../actions/navbarActions";
import {AuthenticationService} from "../../service/AuthenticationService";
import {NeedAuthComponent} from "../core/NeedAuthComponent";
import classnames from "classnames";
import SearchForm from "../core/SearchForm";

class AllAds extends NeedAuthComponent {

    constructor(props) {
        super(props);
        this.props.setActiveNavbarItem(AD_PAGE);
        this.state = {
            show: false,
            search: undefined,
            sort: 'asc'
        };
        this.onAdd = this.onAdd.bind(this);
        this.onHideAddAd = this.onHideAddAd.bind(this);
        this.onChanged = this.onChanged.bind(this);
    }

    componentDidMount() {
        this.props.getAllAds(this.state.search, this.state.sort);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_ADS) {
            this.props.getAllAds(this.state.search, this.state.sort);
        } else if (nextProps.deprecated !== undefined && nextProps.deprecated === TRY_LOGIN) {
            this.props.history.replace("/");
        }
    }

    onChanged(search, sort) {
        this.state.search = search;
        this.state.sort = sort;
        this.props.getAllAds(search, sort);
    }

    onAdd() {
        this.setState({
            show: true
        })
    }

    onHideAddAd() {
        this.setState({
            show: false
        })
    }

    renderIfAuth() {
        let ads = this.props.ads;
        let adElements = [];
        if (ads !== undefined && ads !== null) {
            adElements = this.props.ads.map(ad => (
                <AdItem key={ad.adId} ad={ad}/>));
        }
        return (
            <React.Fragment>
                <SearchForm onChanged={this.onChanged}/>
                <button type="button" className="btn btn-primary shadow p-3 mb-3 rounded btn-lg btn-block"
                        onClick={this.onAdd}>
                    + добавить
                </button>
                {adElements}
                <AddAdDialog title="Добавление" show={this.state.show} onHide={this.onHideAddAd}/>
            </React.Fragment>
        )
    }

    render() {
        return super.render();
    }
}

AllAds.propTypes = {
    ads: PropTypes.array.isRequired,
    getAllAds: PropTypes.func.isRequired,
    addAd: PropTypes.func.isRequired,
    deprecated: PropTypes.string
};

const mapStateToProps = state => ({
    ads: state.adReducer.ads,
    deprecated: state.adReducer.deprecated
});

export default connect(
    mapStateToProps,
    {getAllAds, addAd, setActiveNavbarItem}
)(AllAds);