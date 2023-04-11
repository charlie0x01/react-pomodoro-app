import React, { useState } from "react";

const PomodorCard = ({ title, focusTime, color, onClick, id, onDelete }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      onClick={() => {
        onClick();
        console.log("card clicked");
      }}
      className={`is-clickable is-relative pomodoro-card box ${color} is-flex is-flex-direction-column is-justify-content-space-around is-align-items-center`}
    >
      <div>
        <button onClick={onDelete} className="delete top-right-corner"></button>
        <div className="is-flex is-justify-content-center is-align-items-center glossy">
          <h1 className="is-unselectable title is-size-2 has-text-white">
            {focusTime}
          </h1>
        </div>
        <h1
          className="is-unselectable text-overflow is-size-5 has-text-white"
          style={{ maxWidth: 110 }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};

export default PomodorCard;
