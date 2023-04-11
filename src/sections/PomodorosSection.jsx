import React, { useContext } from "react";
import {
  CHANGE_DEFAULT_SETTINGS,
  DELETE_POMODOR,
  PomodoroContext,
} from "../context/PomoContext";
import PomodorCard from "../components/PomodorCard";
import { colors } from "../utils";

const PomodorosSection = () => {
  const { state, dispatch } = useContext(PomodoroContext);

  const handleOnClick = (id) => {
    const pomodoro = state.pomodoros.filter((pomodoro) => pomodoro.id === id);
    dispatch({
      type: CHANGE_DEFAULT_SETTINGS,
      payload: { ...pomodoro[0] },
    });
  };

  const handleOnDelete = (id) => {
    dispatch({ type: DELETE_POMODOR, payload: { id: id } });
  };
  return (
    <div className="p-5">
      <h1 className="title">Pomodoros</h1>
      <div className="is-flex is-flex-wrap is-flex-direction-row is-gap-3">
        {state.pomodoros.length > 0
          ? state.pomodoros.map((pomodoro, index) => {
              return (
                <PomodorCard
                  color={colors[pomodoro.color]}
                  key={index}
                  id={pomodoro.id}
                  title={pomodoro.name}
                  focusTime={pomodoro.focusTime}
                  onClick={() => handleOnClick(pomodoro.id)}
                  onDelete={() => handleOnDelete(pomodoro.id)}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default PomodorosSection;
