import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const FilterArticles = ({ filterArticles }) => {
    let filterBar;
    const _filterArticles = () => {
        // if filter input is null it won't work and will re-display all articles
        if (filterBar && filterBar.value != undefined) {
            filterArticles(filterBar.value)
        }
    }
    return (
        <div className="row">
            <form className="col-sm-11">
                <div className="form-group well">
                    <input
                        id="filterArticlesInput"
                        type="text"
                        className="form-control"
                        placeholder="filter articles"
                        onChange={_filterArticles}
                        ref={(node) => filterBar = node} />
                </div>
            </form>
        </div>)
}

export default connect()(FilterArticles)