import React from "react";
import UpdateDialog from "../core/UpdateDialog";
import PropTypes from "prop-types";
import classnames from "classnames";

class SellerDialog extends UpdateDialog {

    constructor(props) {
        super(props);
        this.state = {
            sellerId: null,
            title: "",
            show: false,
            passportId: "",
            mail: "",
            phone: "",
            errors: {
                passportId: true,
                mail: true,
                phone: true
            }
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.requestPassports()
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.seller !== undefined) {
            this.setState({
                sellerId: nextProps.seller.sellerId,
                passportId: nextProps.seller.passportId,
                mail: nextProps.seller.mail,
                phone: nextProps.seller.phone
            });
        }
    }

    requestPassports() {
    }

    validation(): boolean {
        const errors = this.state.errors;
        let passportId = parseInt(this.state.passportId, 10);
        let mail = this.state.mail;
        let phone = parseInt(this.state.phone, 10);
        errors.passportId = !Number.isNaN(passportId);
        errors.mail = mail.length > 0;
        errors.phone = phone >= 70000000000 && phone < 80000000000;
        if (!errors.passportId) {
            passportId = ""
        }
        this.setState({
            passportId: passportId,
            phone: phone,
            errors: errors
        });
        return errors.passportId && errors.mail && errors.phone;
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    dialogBody() {
        const errors = this.state.errors;
        let passports = this.state.passports;
        let passportElements = [];
        if (passports !== undefined) {
            passportElements = passports.map(passport => (
                <option key={passport.passportId}
                        value={passport.passportId}>{passport.fullName} ({passport.series} {passport.number})</option>));
        }
        return (
            <React.Fragment>
                <div className="container">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="mail" className="col-sm-2 col-form-label">Почта</label>
                            <div className="input-group-prepend ml-3">
                                <div className="input-group-text">@</div>
                            </div>
                            <div className="col pl-0">
                                <input
                                    type="text"
                                    name="mail"
                                    className={classnames("form-control", {"is-invalid": !errors.mail})}
                                    onChange={this.onChange}
                                    value={this.state.mail}
                                    required/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="passportId" className="col-sm-2 col-form-label">Паспорт</label>
                            <div className="col-sm-10">
                                <select
                                    name="passportId"
                                    className={classnames("custom-select", {"is-invalid": !errors.passportId})}
                                    value={this.state.passportId}
                                    onChange={this.onChange}>
                                    <option disabled hidden value=''/>
                                    {passportElements}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="phone" className="col-sm-2 col-form-label">Телефон</label>
                            <div className="col-sm-10">
                                <input
                                    type="number"
                                    name="phone"
                                    className={classnames("form-control", {"is-invalid": !errors.phone})}
                                    onChange={this.onChange}
                                    value={this.state.phone}
                                    required/>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

SellerDialog.propTypes = {
    seller: PropTypes.object
};

export default SellerDialog;
