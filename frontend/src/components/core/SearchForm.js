import React, {Component} from "react";
import PropTypes from "prop-types";

class SearchForm extends Component {

    constructor(props) {
        super(props);
        this.onChanged = this.onChanged.bind(this);
    }

    onChanged() {
        const search = document.getElementById("search").value;
        const sort = document.getElementById("sort").value;
        if (this.props.onChanged !== undefined) {
            this.props.onChanged(search, sort);
        }
    };

    render() {
        return (
            <form onChange={this.onChanged}>
                <div className="form-group row">
                    <div className="col-sm-9">
                        <input type="text" className="form-control" id="search" placeholder="Поиск..."/>
                    </div>
                    <div className="col">
                        <select
                            id="sort"
                            className="custom-select">
                            <option value='asc'>По возврастанию</option>
                            <option value='desc'>По убыванию</option>
                        </select>
                    </div>
                </div>
            </form>
        )
    }
}

SearchForm.propTypes = {
    onChanged: PropTypes.func
};

export default SearchForm;
