import React from "react";
import UpdateDialog from "../core/UpdateDialog";
import PropTypes from "prop-types";
import classnames from "classnames";

class PassportDialog extends UpdateDialog {

    constructor(props) {
        super(props);
        this.state = {
            passportId: null,
            title: "",
            show: false,
            fullName: "",
            series: "",
            number: "",
            errors: {
                fullName: true,
                series: true,
                number: true
            }
        };
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.passport !== undefined) {
            this.setState({
                passportId: nextProps.passport.passportId,
                fullName: nextProps.passport.fullName,
                series: nextProps.passport.series,
                number: nextProps.passport.number
            });
        }
    }

    validation(): boolean {
        const errors = this.state.errors;
        let fullName = this.state.fullName;
        let series = this.state.series;
        let number = this.state.number;
        errors.fullName = fullName !== "";
        errors.series = series.length === 4;
        errors.number = number.length === 6;
        this.setState({errors: errors});
        return errors.fullName && errors.series && errors.number;
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
                            <label htmlFor="fullName" className="col-sm-2 col-form-label">ФИО</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className={classnames("form-control", {"is-invalid": !errors.fullName})}
                                    name="fullName"
                                    onChange={this.onChange}
                                    value={this.state.fullName}
                                    required/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="series" className="col-sm-2 col-form-label">Серия</label>
                            <div className="col">
                                <input
                                    type="number"
                                    className={classnames("form-control", {"is-invalid": !errors.series})}
                                    name="series"
                                    onChange={this.onChange}
                                    value={this.state.series}
                                    required/>
                            </div>
                            <label htmlFor="number" className="col col-sm-2 col-form-label">Номер</label>
                            <div className="col col-sm-5">
                                <input
                                    type="number"
                                    className={classnames("form-control", {"is-invalid": !errors.number})}
                                    name="number"
                                    onChange={this.onChange}
                                    value={this.state.number}
                                    required/>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

PassportDialog.propTypes = {
    passport: PropTypes.object
};

export default PassportDialog;
