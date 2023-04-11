import { createContext, useContext, useReducer } from "react";

// actions
export const CREATE_POMODORO = "CREATE_POMODORO";
export const CHANGE_DEFAULT_SETTINGS = "CHANGE_DEFAULT_SETTINGS";
export const UPDATE_POMODORO = "UPDATE_POMODORO";
export const DELETE_POMODOR = "DELETE_POMODORO";
export const SHOW_POMODORO = "SHOW_POMODORO";

const initState = {
  pomodoros: [],
  defaultSettings: {
    name: "Pomodoro",
    focusTime: 25,
    shortBreak: 5,
    longBreak: 15,
    pomos: 4,
    color: 2,
  },
};

// pomo context
const PomodoroContext = createContext();

// custom hook for context
const usePomodoroContext = () => {
  return useContext(PomodoroContext);
};
// reducer to change state
const reducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_POMODORO:
      return { ...state, pomodoros: [...state.pomodoros, action.payload] };
    case CHANGE_DEFAULT_SETTINGS:
      return { ...state, defaultSettings: { ...action.payload } };
    case DELETE_POMODOR: {
      const updated = state.pomodoros.filter(
        (pomodoro) => pomodoro.id !== action.payload.id
      );
      return { ...state, pomodoros: [...updated] };
    }
    default:
      return state;
  }
};

const PomodoroContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <PomodoroContext.Provider value={{ state, dispatch }}>
      {children}
    </PomodoroContext.Provider>
  );
};

export { PomodoroContextProvider, PomodoroContext };
