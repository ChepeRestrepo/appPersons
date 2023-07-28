import React from "react";

const Filter = ({ handleChange, query }) => {
  return (
    <div>
      filter shown with <input onChange={handleChange} value={query} />
    </div>
  );
};

export default Filter;
