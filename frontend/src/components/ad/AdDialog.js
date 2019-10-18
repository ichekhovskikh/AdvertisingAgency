import React from "react";
import UpdateDialog from "../core/UpdateDialog";
import PropTypes from "prop-types";
import classnames from "classnames";

class AdDialog extends UpdateDialog {

    constructor(props) {
        super(props);
        this.state = {
            adId: null,
            title: "",
            show: false,
            adName: "",
            price: "",
            duration: "",
            errors: {
                adName: true,
                price: true,
                duration: true
            }
        };
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.ad !== undefined) {
            this.setState({
                adId: nextProps.ad.adId,
                adName: nextProps.ad.adName,
                price: nextProps.ad.price,
                duration: nextProps.ad.duration
            });
        }
    }

    validation(): boolean {
        const errors = this.state.errors;
        let adName = this.state.adName;
        let price = parseInt(this.state.price, 10);
        let duration = parseInt(this.state.duration, 10);
        errors.adName = adName.length > 0;
        errors.price = !Number.isNaN(price);
        errors.duration =  !Number.isNaN(duration) && duration > 0;
        this.setState({
            adName: adName,
            price: price,
            duration: duration,
            errors: errors
        });
        return errors.adName && errors.price && errors.duration;
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
                            <label htmlFor="name" className="col-sm-2 col-form-label">Название</label>
                            <div className="col pr-3">
                                <input
                                    type="text"
                                    className={classnames("form-control", {"is-invalid": !errors.adName})}
                                    name="adName"
                                    onChange={this.onChange}
                                    value={this.state.adName}
                                    required/>
                            </div>
                        </div>
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
                            <div className="input-group-prepend">
                                <span className="input-group-text">₽</span>
                            </div>
                            <label htmlFor="duration" className="col col-sm-1 col-form-label ml-4">Дней</label>
                            <div className="col pr-3">
                                <input
                                    type="number"
                                    className={classnames("form-control", {"is-invalid": !errors.duration})}
                                    name="duration"
                                    onChange={this.onChange}
                                    value={this.state.duration}
                                    required/>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

AdDialog.propTypes = {
    ad: PropTypes.object
};

export default AdDialog;
