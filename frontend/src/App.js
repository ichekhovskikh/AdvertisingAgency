import React, {Component} from "react";
import './App.css';
import Navbar from "./components/core/Navbar";
import {BrowserRouter as Router, Route, withRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import AllPassports from "./components/passport/AllPassports";
import PassportDetails from "./components/passport/PassportDetails";
import AllChecks from "./components/check/AllChecks";
import CheckDetails from "./components/check/CheckDetails";
import AllAds from "./components/ad/AllAds";
import AdDetails from "./components/ad/AdDetails"
import AllAdvertisers from "./components/advertiser/AllAdvertisers";
import AdvertiserDetails from "./components/advertiser/AdvertiserDetails";
import AllSellers from "./components/seller/AllSellers";
import SellerDetails from "./components/seller/SellerDetails";
import AllContracts from "./components/contract/AllContracts";
import ContractDetails from "./components/contract/ContractDetails";
import Login from "./components/core/Login";

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Navbar/>
                        <Route exact path="/" component={withRouter(Login)}/>
                        <Route exact path="/ads" component={withRouter(AllAds)}/>
                        <Route exact path="/ad/:ad_id" component={withRouter(AdDetails)}/>
                        <Route exact path="/contracts" component={withRouter(AllContracts)}/>
                        <Route exact path="/contract/:contract_id" component={withRouter(ContractDetails)}/>
                        <Route exact path="/advertisers" component={withRouter(AllAdvertisers)}/>
                        <Route exact path="/advertiser/:advertiser_id" component={withRouter(AdvertiserDetails)}/>
                        <Route exact path="/sellers" component={withRouter(AllSellers)}/>
                        <Route exact path="/seller/:seller_id" component={withRouter(SellerDetails)}/>
                        <Route exact path="/checks" component={withRouter(AllChecks)}/>
                        <Route exact path="/check/:check_id" component={withRouter(CheckDetails)}/>
                        <Route exact path="/passports" component={withRouter(AllPassports)}/>
                        <Route exact path="/passport/:passport_id" component={withRouter(PassportDetails)}/>
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App;
