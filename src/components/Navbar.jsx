import React, { useContext, useState } from "react";
import Pomodoro from "./Pomodoro";
import { IoSettings } from "react-icons/Io5";

// assets
import pomodoroImage from "../assets/images/pomodoro.png";
import { buttonColors } from "../utils";
import { PomodoroContext } from "../context/PomoContext";

const Navbar = () => {
  const { state } = useContext(PomodoroContext);
  const [pomoAttributes, setPomoAttributes] = useState({
    show: false,
    closeModal: () => setPomoAttributes({ ...pomoAttributes, show: false }),
    doSettings: false,
    doEditing: false,
  });

  return (
    <>
      <nav>
        <div className="px-5 py-3 is-flex is-align-items-center is-justify-content-space-between">
          <div className="is-flex is-align-items-center">
            <figure className="image is-48x48 mr-2">
              <img src={pomodoroImage} />
            </figure>
            <p style={{ margin: 0 }} className="subtitle">
              MR.POMODORO
            </p>
          </div>
          <div className="is-flex is-align-items-center" style={{ gap: 10 }}>
            <button
              onClick={() =>
                setPomoAttributes({
                  ...pomoAttributes,
                  show: true,
                })
              }
              className={`button ${buttonColors[state.defaultSettings.color]}`}
            >
              Add Pomodoro
            </button>
            <button
              onClick={() =>
                setPomoAttributes({
                  ...pomoAttributes,
                  show: true,
                  doSettings: true,
                })
              }
              className={`button ${buttonColors[state.defaultSettings.color]}`}
            >
              <IoSettings />
            </button>
          </div>
        </div>
      </nav>
      <Pomodoro {...pomoAttributes} />
    </>
  );
};

export default Navbar;
