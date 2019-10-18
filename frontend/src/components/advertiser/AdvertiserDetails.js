import React from "react";
import {Link} from "react-router-dom";
import AdvertiserItem from "./AdvertiserItem";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getAdvertiser} from "../../actions/advertiserActions";
import {ADVERTISER_PAGE, GET_ALL_ADVERTISERS, TRY_LOGIN} from "../../actions/types";
import {setActiveNavbarItem} from "../../actions/navbarActions";
import {NeedAuthComponent} from "../core/NeedAuthComponent";

class AdvertiserDetails extends NeedAuthComponent {

    constructor(props) {
        super(props);
        this.props.setActiveNavbarItem(ADVERTISER_PAGE);
        this.state = {advertiser: {}}
    }

    componentDidMount() {
        this.refreshAdvertiser()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_ADVERTISERS) {
            this.refreshAdvertiser();
        } else if (nextProps.deprecated !== undefined && nextProps.deprecated === TRY_LOGIN) {
            this.props.history.replace("/");
        } else if (nextProps.advertiser !== undefined && !nextProps.advertiser) {
            this.props.history.replace("/advertisers");
        } else if (nextProps.advertiser !== undefined && this.state.advertiser !== nextProps.advertiser) {
            this.setState({advertiser: nextProps.advertiser})
        }
    }

    refreshAdvertiser() {
        const {advertiser_id} = this.props.match.params;
        this.props.getAdvertiser(advertiser_id);
    }

    renderIfAuth() {
        let advertiserElement = <div/>;
        if (this.state.advertiser !== undefined && this.state.advertiser.advertiserId !== undefined) {
            advertiserElement = <AdvertiserItem advertiser={this.state.advertiser}/>
        }
        return (
            <React.Fragment>
                <Link to="/advertisers"
                      id="toAdvertisers"
                      className="btn btn-primary shadow p-3 mb-3 rounded btn-lg btn-block">
                    показать все
                </Link>
                {advertiserElement}
            </React.Fragment>
        )
    }
}

AdvertiserDetails.propTypes = {
    advertiser: PropTypes.array.isRequired,
    getAdvertiser: PropTypes.func.isRequired,
    deprecated: PropTypes.string
};

const mapStateToProps = state => ({
    advertiser: state.advertiserReducer.advertiser,
    deprecated: state.advertiserReducer.deprecated
});

export default connect(
    mapStateToProps,
    {getAdvertiser, setActiveNavbarItem}
)(AdvertiserDetails);