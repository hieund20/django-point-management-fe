import React from "react";
import "./style.scss";

const Pagination = (props) => {
  const { data, setNextUrl, setPreviousUrl } = props;

  return (
    <div className="pagination">
      <button
        disabled={!data.previous}
        onClick={() => setPreviousUrl(data.previous)}
        className={!data.previous ? "disabled" : ""}
      >
        {"<"}
      </button>
      <button
        disabled={!data.next}
        onClick={() => setNextUrl(data.next)}
        className={!data.next ? "disabled" : ""}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
