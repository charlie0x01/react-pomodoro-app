import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import {
  CHANGE_DEFAULT_SETTINGS,
  CREATE_POMODORO,
  PomodoroContext,
} from "../context/PomoContext";

const Pomodoro = ({ show, doEditing, onSave, doSettings }) => {
  const { dispatch } = useContext(PomodoroContext);
  // local state
  const [pomodoro, setPomodoro] = useState({
    name: "",
    focusTime: 25,
    shortBreak: 5,
    longBreak: 15,
    pomos: 4,
    color: "#000000",
  });

  // clear state
  const clearState = () => {
    setPomodoro({
      name: "",
      focusTime: 25,
      shortBreak: 5,
      longBreak: 15,
      pomos: 4,
      color: "#000000",
    });
    onSave();
  };

  // create pomo
  const handleSave = () => {
    if (
      pomodoro.name.length < 1 ||
      pomodoro.focusTime === 0 ||
      pomodoro.shortBreak === 0 ||
      pomodoro.longBreak === 0
    ) {
      return;
    }

    if (pomodoro.color === "#ffffff") {
      toast.info("background color can't be white because text color is.");
      return;
    }

    dispatch({ type: CREATE_POMODORO, payload: pomodoro });

    clearState();
  };

  // change default settings
  const changeDefaultSettings = () => {
    dispatch({
      type: CHANGE_DEFAULT_SETTINGS,
      payload: { ...pomodoro, name: "Pomodoro" },
    });
    clearState();

    toast.success("settings applied successfully.");
  };

  // change settings
  const handleChange = () => {};

  // conditional buttons
  const renderButtons = () => {
    if (doSettings === true)
      return (
        <button onClick={changeDefaultSettings} className="button is-primary">
          Apply Settings
        </button>
      );
    else if (doEditing === true) return <button>Apply Changes</button>;
    else return <button className="button is-primary">Create Pomodoro</button>;
  };

  if (show === false) return null;
  return createPortal(
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content" style={{ maxWidth: 400 }}>
        <div className="box">
          <p className="title">
            {doSettings ? "Pomodoro Settings" : "Pomodoro"}
          </p>
          {doSettings === false ? (
            <div className="block">
              <lable className="subtitle">Name</lable>
              <input
                value={pomodoro.name}
                onChange={(e) =>
                  setPomodoro({ ...pomodoro, name: e.target.value })
                }
                className="input mt-2"
                type="text"
                placeholder="Pomodoro Name"
              />
            </div>
          ) : (
            <></>
          )}
          <div className="block">
            <lable className="subtitle">Focus Time (mins)</lable>
            <input
              defaultValue={25}
              value={pomodoro.focusTime}
              onChange={(e) =>
                setPomodoro({
                  ...pomodoro,
                  focusTime: parseInt(e.target.value),
                })
              }
              className="input mt-2"
              type="number"
            />
            <p>Time for a Focus Period is normally 25 mins</p>
            <p></p>
          </div>
          <div className="block">
            <lable className="subtitle">Short Break (mins)</lable>
            <input
              defaultValue={5}
              value={pomodoro.shortBreak}
              onChange={(e) =>
                setPomodoro({
                  ...pomodoro,
                  shortBreak: parseInt(e.target.value),
                })
              }
              className="input mt-2"
              type="number"
              placeholder="Text input"
            />
            <p>Time for short rest between pomos is normally 5 mins</p>
          </div>
          <div className="block">
            <lable className="subtitle">Long Break (mins)</lable>
            <input
              defaultValue={15}
              value={pomodoro.longBreak}
              onChange={(e) =>
                setPomodoro({
                  ...pomodoro,
                  longBreak: parseInt(e.target.value),
                })
              }
              className="input mt-2"
              type="number"
              placeholder="Text input"
            />
            <p>Time for long rest between pomo sets is normally 15 mins</p>
            <p></p>
          </div>
          <div className="block">
            <lable className="subtitle">Set of Pomo (pomos)</lable>
            <input
              defaultValue={4}
              value={pomodoro.pomos}
              onChange={(e) =>
                setPomodoro({ ...pomodoro, pomos: parseInt(e.target.value) })
              }
              className="input mt-2"
              type="number"
              placeholder="Text input"
            />
            <p>Focus Time + Break tiem is a pomo. normally 4 sets</p>
            <p></p>
          </div>
          {doSettings === false ? (
            <div
              className="block is-flex is-align-items-center"
              style={{ gap: 8 }}
            >
              <span>
                <lable className="subtitle">Color</lable>
              </span>
              <input
                style={{ width: 50 }}
                className="input"
                value={pomodoro.color}
                type="color"
                placeholder="Text input"
                onChange={(e) =>
                  setPomodoro({ ...pomodoro, color: e.target.value })
                }
              />
            </div>
          ) : (
            <></>
          )}
          <div className="is-flex is-justify-content-end" style={{ gap: 10 }}>
            {renderButtons()}
            <button onClick={clearState} className="button is-danger">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default Pomodoro;
