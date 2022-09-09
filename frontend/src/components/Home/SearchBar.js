import React, { useEffect } from "react";
import agent from "../../agent";
import {
  APPLY_SEARCH_FILTER
} from "../../constants/actionTypes";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  ...state.itemList,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onSearchInput: (searchTerm, pager, payload) =>
    dispatch({ type: APPLY_SEARCH_FILTER, searchTerm, pager, payload }),
});

const SearchBar = (props) => {

  const searchItems = (searchValue) => {
    if (searchValue.length > 2) {
      props.onSearchInput(
        searchValue,
        (page) => agent.Items.byTitle(searchValue, page),
        agent.Items.byTitle(searchValue)
      );
    }else{
      props.onSearchInput(
        searchValue,
        (page) => agent.Items.all(page),
        agent.Items.all()
      );
    }
  };

  useEffect(() => {}, []);

  return (
    <span className="input-group col-4" style={{ display: "inline-flex" }}>
      <input
        placeholder="What is it that you truly desire?"
        minLength={3}
        type="search"
        className="form-control py-2 border-right-0 border"
        onChange={(e) => searchItems(e.target.value)}
      />
      <span className="input-group-append">
        <div className="input-group-text bg-white">
          <i className="bi bi-search" style={{ color: "magenta" }}></i>
        </div>
      </span>
    </span>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);