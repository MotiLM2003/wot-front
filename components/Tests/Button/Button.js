import React from "react";

const Button = ({ label, bgColor, size, onClick }) => {
  return (
    <div>
      <button value="Hello world">{label}</button>
    </div>
  );
};

// Button.propTypes = {
//   label: PropTypes.string,
//   bgColor: PropTypes.string,
//   size: PropTypes.oneOf(["sm", "md", "lg"]),
//   onClick: PropTypes.func,
// };

export default Button;
