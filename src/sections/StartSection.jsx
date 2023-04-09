import React, { useContext, useState } from "react";
import Stopwatch from "../components/Stopwatch";
import { PomodoroContext } from "../context/PomoContext";

const StartSection = () => {
  const { state } = useContext(PomodoroContext);
  const [showStopwatch, setShowStopwatch] = useState({
    isBreak: false,
    isLongBreak: false,
    isFocusTime: false,
  });
  const [pomoCount, setPomoCount] = useState(0);

  const handleFinish = () => {
    if (showStopwatch.isFocusTime === true) {
      if (pomoCount === state.defaultSettings.pomos)
        setShowStopwatch({
          isBreak: false,
          isFocusTime: false,
          isLongBreak: true,
        });
      else
        setShowStopwatch({
          isLongBreak: false,
          isFocusTime: false,
          isBreak: true,
        });
    } else {
      setShowStopwatch({
        isLongBreak: false,
        isBreak: false,
        isFocusTime: false,
      });
    }
  };

  const handleStart = () => {
    setShowStopwatch({ isLongBreak: false, isBreak: false, isFocusTime: true });

    if (pomoCount === state.defaultSettings.pomos) setPomoCount(0);
    else setPomoCount(pomoCount + 1);
  };

  return (
    <>
      <div className="container">
        <div
          style={{ gap: 10 }}
          className="is-flex is-align-items-center is-justify-content-center is-flex-direction-column p-5"
        >
          <p className="title">{state.defaultSettings.name}</p>
          <p className="subtitle">{`Pomos ${pomoCount} / ${state.defaultSettings.pomos}`}</p>
          <button onClick={handleStart} className="button is-primary is-large">
            Start
          </button>
        </div>
      </div>
      {showStopwatch.isLongBreak === true ? (
        <Stopwatch
          show={showStopwatch.isLongBreak}
          onFinish={handleFinish}
          finishTime={state.defaultSettings.longBreak}
          title="Long Break!!"
          subtitle="WoW!! Congrates you completed your 1st pomo set"
          paused={false}
        />
      ) : (
        <></>
      )}
      {showStopwatch.isBreak === true ? (
        <Stopwatch
          show={showStopwatch.isBreak}
          onFinish={handleFinish}
          finishTime={state.defaultSettings.shortBreak}
          title="Relax It's Break!!"
          subtitle="why not make yourself a coffee!!"
          paused={false}
        />
      ) : (
        <></>
      )}
      {showStopwatch.isFocusTime === true ? (
        <Stopwatch
          finishTime={state.defaultSettings.focusTime}
          show={showStopwatch.isFocusTime}
          title="Focus Time"
          subtitle="Stay Focused on the Mission!!"
          onFinish={handleFinish}
          paused={false}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default StartSection;
