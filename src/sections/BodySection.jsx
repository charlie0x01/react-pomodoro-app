import React from "react";
import StartSection from "./StartSection";

const BodySection = () => {
  return (
    <div
      style={{ height: "100dvh" }}
      className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
    >
      <StartSection />
      {/* <Pomodoros /> */}
    </div>
  );
};

export default BodySection;
