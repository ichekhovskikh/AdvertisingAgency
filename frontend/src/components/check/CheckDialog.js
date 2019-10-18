import React from "react";
import UpdateDialog from "../core/UpdateDialog";
import PropTypes from "prop-types";
import classnames from "classnames";

class CheckDialog extends UpdateDialog {

    constructor(props) {
        super(props);
        this.state = {
            checkId: null,
            title: "",
            show: false,
            price: "",
            nds: "",
            tax: "",
            errors: {
                price: true,
                nds: true,
                tax: true
            }
        };
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.check !== undefined) {
            this.setState({
                checkId: nextProps.check.checkId,
                price: nextProps.check.price,
                nds: nextProps.check.nds,
                tax: nextProps.check.tax
            });
        }
    }

    validation(): boolean {
        const errors = this.state.errors;
        let price = parseInt(this.state.price, 10);
        let nds = parseInt(this.state.nds, 10);
        let tax = parseInt(this.state.tax, 10);
        errors.price = price > 0;
        errors.nds = nds >= 0 && nds <= 100;
        errors.tax =  tax >= 0 && tax <= 100;
        this.setState({
            price: price,
            nds: nds,
            tax: tax,
            errors: errors
        });
        return errors.price && errors.nds && errors.tax;
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    dialogBody() {
        const errors = this.state.errors;
        return (
            <React.Fragment>
                <div className="container">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="price" className="col-sm-2 col-form-label">Цена</label>
                            <div className="col pr-0">
                                <input
                                    type="number"
                                    className={classnames("form-control", {"is-invalid": !errors.price})}
                                    name="price"
                                    onChange={this.onChange}
                                    value={this.state.price}
                                    required/>
                            </div>
                            <div className="input-group-prepend pr-3">
                                <span className="input-group-text">₽</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="nds" className="col-sm-2 col-form-label">НДС</label>
                            <div className="col pr-0">
                                <input
                                    type="number"
                                    className={classnames("form-control", {"is-invalid": !errors.nds})}
                                    name="nds"
                                    onChange={this.onChange}
                                    value={this.state.nds}
                                    required/>
                            </div>
                            <div className="input-group-prepend">
                                <span className="input-group-text">%</span>
                            </div>
                            <label htmlFor="tax" className="col col-sm-1 col-form-label ml-4">Налог</label>
                            <div className="col pr-0">
                                <input
                                    type="number"
                                    className={classnames("form-control", {"is-invalid": !errors.tax})}
                                    name="tax"
                                    onChange={this.onChange}
                                    value={this.state.tax}
                                    required/>
                            </div>
                            <div className="input-group-prepend pr-3">
                                <span className="input-group-text">%</span>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

CheckDialog.propTypes = {
    check: PropTypes.object
};

export default CheckDialog;
