import { useContext, useEffect, useState } from "react";
import "./Filters.css";
import { DataContext } from "../context/DataContext";

export const Filters = () => {
  const { postState, dispatchPost } = useContext(DataContext);
  const [showFilters, setShowFilters] = useState(false);
  console.log(showFilters);

  //   useEffect(() => {
  //     console.log("check");
  //     document.addEventListener("click", () => {
  //       setShowFilters(() => false);
  //     });
  //   }, []);

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
                setShowFilters(() => true);
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
