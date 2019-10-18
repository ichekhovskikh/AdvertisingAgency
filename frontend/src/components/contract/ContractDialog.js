import React from "react";
import UpdateDialog from "../core/UpdateDialog";
import PropTypes from "prop-types";
import classnames from "classnames";

class ContractDialog extends UpdateDialog {

    constructor(props) {
        super(props);
        this.state = {
            contractId: null,
            title: "",
            show: false,
            adId: "",
            advertiserId: "",
            sellerId: "",
            checkId: "",
            errors: {
                adId: true,
                advertiserId: true,
                sellerId: true,
                checkId: true
            }
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.sendAdditionalRequests()
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.contract !== undefined) {
            this.setState({
                contractId: nextProps.contract.contractId,
                adId: nextProps.contract.adId,
                advertiserId: nextProps.contract.advertiserId,
                sellerId: nextProps.contract.sellerId,
                checkId: nextProps.contract.checkId
            });
        }
    }

    sendAdditionalRequests() {
    }

    validation(): boolean {
        const errors = this.state.errors;
        let adId = parseInt(this.state.adId, 10);
        let advertiserId = parseInt(this.state.advertiserId, 10);
        let sellerId = parseInt(this.state.sellerId, 10);
        let checkId = parseInt(this.state.checkId, 10);
        errors.adId = !Number.isNaN(adId);
        errors.advertiserId = !Number.isNaN(advertiserId);
        errors.sellerId = !Number.isNaN(sellerId);
        errors.checkId = !Number.isNaN(checkId);
        if (!errors.adId) {
            adId = ""
        }
        if (!errors.advertiserId) {
            advertiserId = ""
        }
        if (!errors.sellerId) {
            sellerId = ""
        }
        if (!errors.checkId) {
            checkId = ""
        }
        this.setState({
            adId: adId,
            advertiserId: advertiserId,
            sellerId: sellerId,
            checkId: checkId,
            errors: errors
        });
        return errors.adId && errors.advertiserId && errors.sellerId && errors.checkId;
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    dialogBody() {
        const errors = this.state.errors;
        let ads = this.state.ads;
        let adElements = [];
        if (ads !== undefined) {
            adElements = ads.map(ad => (<option key={ad.adId} value={ad.adId}>{ad.adName}</option>));
        }
        let advertisers = this.state.advertisers;
        let advertiserElements = [];
        if (advertisers !== undefined) {
            advertiserElements = advertisers.map(advertiser => (
                <option key={advertiser.advertiserId}
                        value={advertiser.advertiserId}>
                    {advertiser.passport.fullName} ({advertiser.passport.series} {advertiser.passport.number})
                </option>
            ));
        }
        let sellers = this.state.sellers;
        let sellerElements = [];
        if (sellers !== undefined) {
            sellerElements = sellers.map(seller => (
                <option key={seller.sellerId}
                        value={seller.sellerId}>
                    {seller.passport.fullName} ({seller.passport.series} {seller.passport.number})
                </option>
            ));
        }
        let checks = this.state.checks;
        let checkElements = [];
        if (checks !== undefined) {
            checkElements = checks.map(check => (
                <option key={check.checkId} value={check.checkId}>{check.checkId}</option>
            ));
        }
        return (
            <React.Fragment>
                <div className="container">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="adId" className="col-sm-2 col-form-label">Реклама</label>
                            <div className="col-sm-10">
                                <select
                                    name="adId"
                                    className={classnames("custom-select", {"is-invalid": !errors.adId})}
                                    value={this.state.adId}
                                    onChange={this.onChange}>
                                    <option disabled hidden value=''/>
                                    {adElements}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="advertiserId" className="col-sm-2 col-form-label">Рекламодатель</label>
                            <div className="col-sm-10">
                                <select
                                    name="advertiserId"
                                    className={classnames("custom-select", {"is-invalid": !errors.advertiserId})}
                                    value={this.state.advertiserId}
                                    onChange={this.onChange}>
                                    <option disabled hidden value=''/>
                                    {advertiserElements}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="sellerId" className="col-sm-2 col-form-label">Продавец</label>
                            <div className="col-sm-10">
                                <select
                                    name="sellerId"
                                    className={classnames("custom-select", {"is-invalid": !errors.sellerId})}
                                    value={this.state.sellerId}
                                    onChange={this.onChange}>
                                    <option disabled hidden value=''/>
                                    {sellerElements}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="checkId" className="col-sm-2 col-form-label">Чек</label>
                            <div className="col-sm-10">
                                <select
                                    name="checkId"
                                    className={classnames("custom-select", {"is-invalid": !errors.checkId})}
                                    value={this.state.checkId}
                                    onChange={this.onChange}>
                                    <option disabled hidden value=''/>
                                    {checkElements}
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

ContractDialog.propTypes = {
    contract: PropTypes.object
};

export default ContractDialog;
