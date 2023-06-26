import { useContext, useEffect, useState } from "react";
import "./Filters.css";
import { DataContext } from "../context/DataContext";

export const Filters = () => {
  const { postState, dispatchPost } = useContext(DataContext);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <div className="filter-container-layout">
        <div className="filter-header">
          <span className="filter-type">{postState?.sortBy}</span> Posts
        </div>
        <div className="filter-section">
          {!showFilters && (
            <i
              className="fa-solid fa-filter"
              onClick={() => {
                setShowFilters((showFilters) => !showFilters);
              }}
            ></i>
          )}
          {showFilters && (
            <i
              className="fa-solid fa-x fa-filter"
              onClick={() => {
                setShowFilters((showFilters) => !showFilters);
              }}
            ></i>
          )}
          {showFilters && (
            <div className="filter-section-container">
              <div
                className={`filter-pill ${
                  postState?.sortBy === "trending" && "bold-color"
                } `}
                onClick={() => {
                  dispatchPost({
                    type: "SET_SORT_BY",
                    payload: "trending",
                  });
                  setShowFilters((showFilters) => !showFilters);
                }}
              >
                <i className="fa-solid fa-arrow-trend-up"></i>Trending
              </div>
              <div
                className={`filter-pill ${
                  postState?.sortBy === "latest" && "bold-color"
                } `}
                onClick={() => {
                  dispatchPost({
                    type: "SET_SORT_BY",
                    payload: "latest",
                  });
                  setShowFilters((showFilters) => !showFilters);
                }}
              >
                <i className="fa-solid fa-caret-up"></i>Latest
              </div>
              <div
                className={`filter-pill ${
                  postState?.sortBy === "oldest" && "bold-color"
                } `}
                onClick={() => {
                  dispatchPost({
                    type: "SET_SORT_BY",
                    payload: "oldest",
                  });
                  setShowFilters((showFilters) => !showFilters);
                }}
              >
                <i className="fa-solid fa-caret-down"></i>
                Oldest
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
