import React from "react";
import {Link} from "react-router-dom";
import AdItem from "./AdItem";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getAd} from "../../actions/adActions";
import {AD_PAGE, GET_ALL_ADS, TRY_LOGIN} from "../../actions/types";
import {setActiveNavbarItem} from "../../actions/navbarActions";
import {NeedAuthComponent} from "../core/NeedAuthComponent";

class AdDetails extends NeedAuthComponent {

    constructor(props) {
        super(props);
        this.props.setActiveNavbarItem(AD_PAGE);
        this.state = {ad: {}}
    }

    componentDidMount() {
        this.refreshAd()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_ADS) {
            this.refreshAd();
        } else if (nextProps.deprecated !== undefined && nextProps.deprecated === TRY_LOGIN) {
            this.props.history.replace("/");
        } else if (nextProps.ad !== undefined && !nextProps.ad) {
            this.props.history.replace("/ads");
        } else if (nextProps.ad !== undefined && this.state.ad !== nextProps.ad) {
            this.setState({ad: nextProps.ad})
        }
    }

    refreshAd() {
        const {ad_id} = this.props.match.params;
        this.props.getAd(ad_id);
    }

    renderIfAuth() {
        let adElement = <div/>;
        if (this.state.ad !== undefined && this.state.ad.adId !== undefined) {
            adElement = <AdItem ad={this.state.ad}/>
        }
        return (
            <React.Fragment>
                <Link to="/ads"
                      id="toAds"
                      className="btn btn-primary shadow p-3 mb-3 rounded btn-lg btn-block">
                    показать все
                </Link>
                {adElement}
            </React.Fragment>
        )
    }
}

AdDetails.propTypes = {
    ad: PropTypes.array.isRequired,
    getAd: PropTypes.func.isRequired,
    deprecated: PropTypes.string
};

const mapStateToProps = state => ({
    ad: state.adReducer.ad,
    deprecated: state.adReducer.deprecated
});

export default connect(
    mapStateToProps,
    {getAd, setActiveNavbarItem}
)(AdDetails);