import React from "react";
import AdvertiserItem from "./AdvertiserItem";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addAdvertiser, getAllAdvertisers} from "../../actions/advertiserActions";
import AddAdvertiserDialog from "./AddAdvertiserDialog";
import {ADVERTISER_PAGE, GET_ALL_ADVERTISERS, TRY_LOGIN} from "../../actions/types";
import {setActiveNavbarItem} from "../../actions/navbarActions";
import {NeedAuthComponent} from "../core/NeedAuthComponent";
import SearchForm from "../core/SearchForm";

class AllAdvertisers extends NeedAuthComponent {

    constructor(props) {
        super(props);
        this.props.setActiveNavbarItem(ADVERTISER_PAGE);
        this.state = {
            show: false,
            search: undefined,
            sort: 'asc'
        };
        this.onAdd = this.onAdd.bind(this);
        this.onHideAddAdvertiser = this.onHideAddAdvertiser.bind(this);
        this.onChanged = this.onChanged.bind(this);
    }

    componentDidMount() {
        this.props.getAllAdvertisers(this.state.search, this.state.sort);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deprecated !== undefined && nextProps.deprecated === GET_ALL_ADVERTISERS) {
            this.props.getAllAdvertisers(this.state.search, this.state.sort);
        } else if (nextProps.deprecated !== undefined && nextProps.deprecated === TRY_LOGIN) {
            this.props.history.replace("/");
        }
    }

    onChanged(search, sort) {
        this.state.search = search;
        this.state.sort = sort;
        this.props.getAllAdvertisers(search, sort);
    }

    onAdd() {
        this.setState({
            show: true
        })
    }

    onHideAddAdvertiser() {
        this.setState({
            show: false
        })
    }

    renderIfAuth() {
        let advertisers = this.props.advertisers;
        let advertiserElements = [];
        if (advertisers !== undefined && advertisers !== null) {
            advertiserElements = this.props.advertisers.map(advertiser => (
                <AdvertiserItem key={advertiser.advertiserId} advertiser={advertiser}/>));
        }
        return (
            <React.Fragment>
                <SearchForm onChanged={this.onChanged}/>
                <button type="button" className="btn btn-primary shadow p-3 mb-3 rounded btn-lg btn-block"
                        onClick={this.onAdd}>
                    + добавить
                </button>
                {advertiserElements}
                <AddAdvertiserDialog title="Добавление" show={this.state.show} onHide={this.onHideAddAdvertiser}/>
            </React.Fragment>
        )
    }
}

AllAdvertisers.propTypes = {
    advertisers: PropTypes.array.isRequired,
    getAllAdvertisers: PropTypes.func.isRequired,
    addAdvertiser: PropTypes.func.isRequired,
    deprecated: PropTypes.string
};

const mapStateToProps = state => ({
    advertisers: state.advertiserReducer.advertisers,
    deprecated: state.advertiserReducer.deprecated
});

export default connect(
    mapStateToProps,
    {getAllAdvertisers, addAdvertiser, setActiveNavbarItem}
)(AllAdvertisers);