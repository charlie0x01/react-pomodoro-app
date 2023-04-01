import React, { useContext, useState } from "react";
import { PomodoroContext } from "../PomoContext";
import Pomodoro from "./Pomodoro";

// assets
import pomodoroImage from "../assets/images/pomodoro.png";

const Navbar = () => {
  const { state } = useContext(PomodoroContext);
  const [pomoAttributes, setPomoAttributes] = useState({
    show: false,
    onSave: () => setPomoAttributes({ ...pomoAttributes, show: false }),
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
            {/* <span className="tag is-primary">{state.pomodoros.length}</span>
            <button
              onClick={() =>
                setPomoAttributes({
                  ...pomoAttributes,
                  show: true,
                })
              }
              className="button is-primary"
            >
              New Pomo
            </button> */}
            <button
              onClick={() =>
                setPomoAttributes({
                  ...pomoAttributes,
                  show: true,
                  doSettings: true,
                })
              }
              className="button is-primary"
            >
              Settings
            </button>
          </div>
        </div>
      </nav>
      <Pomodoro {...pomoAttributes} />
    </>
  );
};

export default Navbar;
