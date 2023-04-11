import React, { useState } from "react";

const Color = ({ color, isSelected, onClick }) => {
  const [selected, setSelected] = useState(isSelected || false);

  return (
    <div className={`${color} is-flex`} style={{ padding: "4px", borderRadius: 8}}>
      <div
        className={`is-medium tag ${color} ${
          isSelected ? "color-selected" : ""
        }`}
        onClick={() => {
          setSelected(!selected);
          onClick();
        }}
      ></div>
    </div>
  );
};

export default Color;
