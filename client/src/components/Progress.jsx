import React from "react";
import PropTypes from "prop-types";

const Progress = ({ value = 0, className = "" }) => {
  return (
    <div
      className={`relative w-full h-2 rounded-full overflow-hidden bg-white ${className}`}
    >
      <div
        className="h-full bg-black transition-all duration-300 ease-in-out"
        style={{
          width: `${value}%`,
        }}
      ></div>
    </div>
  );
};

Progress.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
};

export default Progress;
