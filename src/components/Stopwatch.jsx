import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import useSound from "use-sound";

// assets
// import focusImage from "../assets/images/focus.jpg";
import successSound from "../assets/sounds/success.mp3";

const Stopwatch = ({
  title,
  subtitle,
  paused,
  finishTime = 1,
  onFinish,
  show,
}) => {
  // sound state
  const [success] = useSound(successSound, { volume: 0.25 });
  // time states
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  // isPaused and stop states
  const [isPaused, setIsPaused] = useState(paused);
  const [pBValue, setPBValue] = useState(0);

  useEffect(() => {
    let interval;
    if (isPaused !== true) {
      interval = setInterval(() => {
        setSeconds(seconds + 1);
        setPBValue(pBValue + 1);
        if (seconds === 59) {
          setSeconds(0);
          setMinutes(minutes + 1);
        }
      }, 1000);
    }

    if (minutes === finishTime) {
      success();
      setSeconds(0);
      setMinutes(0);
      setPBValue(0);
      setIsPaused(true);
      onFinish();
      return () => clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPaused, seconds]);

  if (show === false) return null;
  return createPortal(
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div
        className="modal-content box is-flex is-justify-content-center is-align-items-center is-flex-direction-column"
        style={{ width: 350, gap: 10 }}
      >
        <span className="title no-margin">{title}</span>
        <span className="subtitle no-margin" style={{ textAlign: "center"}}>{subtitle}</span>
        <div className="" style={{ fontSize: "70px" }}>
          <span className="">{("0" + Math.floor(minutes)).slice(-2)}:</span>
          <span className="">{("0" + Math.floor(seconds)).slice(-2)}</span>
        </div>
        <span className="subtitle no-margin">
          {`Remaining Time ${(
            "0" + Math.floor(finishTime - (pBValue / 60))
          ).slice(-2)}:${(
            "0" + Math.floor((seconds - 60) * -1)
          ).slice(-2)}s`}
        </span>
        <progress
          class="progress is-small"
          value={pBValue}
          max={finishTime * 60}
        />
        <div className="is-flex" style={{ gap: 10 }}>
          {!isPaused && (
            <button
              onClick={() => setIsPaused(true)}
              className="button is-info"
            >
              Pause
            </button>
          )}
          {isPaused && (
            <button
              onClick={() => setIsPaused(false)}
              className="button is-primary"
            >
              Start
            </button>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default Stopwatch;
