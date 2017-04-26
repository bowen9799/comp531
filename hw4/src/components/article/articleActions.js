import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const FilterArticles = ({ filterArticles }) => {
  let filter;
  const _filter = () => {
    // if filter input is null it won't work and will re-display all articles
    if (filter && filter.value) {
      filterArticles(filter.value)
    }
  }
  return (
    <div className="row">
      <form className="col-sm-11">
        <div className="form-group">
          <input type="text"
            className="form-control form-control-lg"
            placeholder="Filter articles by author / keyword"
            onChange={_filter}
            ref={(node) => filter = node} />
        </div>
      </form>
    </div>)
}

FilterArticles.propTypes = {
  filterArticles: PropTypes.func.isRequired
}

export default connect()(FilterArticles)