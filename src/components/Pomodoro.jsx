import React, { useContext, useState } from "react";
import {
  CHANGE_DEFAULT_SETTINGS,
  CREATE_POMODORO,
  PomodoroContext,
} from "../context/PomoContext";
import Toast from "./ToastNotification";
import Modal from "./Modal";
import { useFormik } from "formik";
import { colors } from "../utils";
import Color from "./Color";

const initialValues = {
  name: "",
  focusTime: 25,
  shortBreak: 5,
  longBreak: 15,
  pomos: 4,
  color: 0,
};

const validate = (values) => {
  let errors = {};

  // validate title
  if (!values.name) errors.name = "Required";
  else if (values.name.length < 2)
    errors.name = "Title should contain at least 2 character";

  // focus time
  if (values.focusTime < 1 || values.focusTime > 90)
    errors.focusTime = "Focus Time duration should be between 1 to 90 mins";

  // short break
  if (values.shortBreak < 1 || values.shortBreak > 10)
    errors.shortBreak = "Short Break duration should be between 1 to 10 mins";

  // long break
  if (values.longBreak < 5 || values.longBreak > 20)
    errors.longBreak = "Long Break duration should be between 5 to 20 mins";

  // pomos
  if (values.pomos < 1) errors.pomos = "Add at least one Pomo";

  return errors;
};

const Pomodoro = ({ show, doEditing, onSave, doSettings }) => {
  // form state
  const formik = useFormik({
    initialValues,
    validate,
  });
  const { dispatch } = useContext(PomodoroContext);

  // create pomo
  // const handleSave = () => {
  //   dispatch({ type: CREATE_POMODORO, payload: pomodoro });

  //   clearState();
  // };

  // // change default settings
  // const changeDefaultSettings = () => {
  //   dispatch({
  //     type: CHANGE_DEFAULT_SETTINGS,
  //     payload: { ...pomodoro, name: "Pomodoro" },
  //   });

  //   Toast("Settings Applied Successfully", "is-primary", 10000);
  // };

  return (
    <Modal show={show}>
      <p className="title">{doSettings ? "Pomodoro Settings" : "Pomodoro"}</p>
      <form onSubmit={formik.handleSubmit}>
        {doSettings === false ? (
          <div className="block">
            <lable className="subtitle">Name</lable>
            <input
              {...formik.getFieldProps("name")}
              className="input mt-2"
              type="text"
              placeholder="Pomodoro Name"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}
          </div>
        ) : null}
        <div className="block">
          <lable className="subtitle">Focus Time (mins)</lable>
          <input
            min={1}
            max={90}
            {...formik.getFieldProps("focusTime")}
            className="input mt-2"
            type="number"
          />
          {formik.touched.focusTime && formik.errors.focusTime ? (
            <div className="error">{formik.errors.focusTime}</div>
          ) : null}
          <p>Time for a Focus Period is normally 25 mins</p>
        </div>
        <div className="block">
          <lable className="subtitle">Short Break (mins)</lable>
          <input
            {...formik.getFieldProps("shortBreak")}
            className="input mt-2"
            type="number"
            placeholder="Text input"
          />
          {formik.touched.shortBreak && formik.errors.shortBreak ? (
            <div className="error">{formik.errors.shortBreak}</div>
          ) : null}
          <p>Time for short rest between pomos is normally 5 mins</p>
        </div>
        <div className="block">
          <lable className="subtitle">Long Break (mins)</lable>
          <input
            {...formik.getFieldProps("longBreak")}
            className="input mt-2"
            type="number"
          />
          {formik.touched.longBreak && formik.errors.longBreak ? (
            <div className="error">{formik.errors.longBreak}</div>
          ) : null}
          <p>Time for long rest between pomo sets is normally 15 mins</p>
          <p></p>
        </div>
        <div className="block">
          <lable htmlFor="pomos" className="subtitle">
            Set of Pomo (pomos)
          </lable>
          <input
            {...formik.getFieldProps("pomos")}
            className="input mt-2"
            type="number"
          />
          {formik.touched.pomos && formik.errors.pomos ? (
            <div className="error">{formik.errors.pomos}</div>
          ) : null}
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
            <div className="is-flex ml-3" style={{ gap: 10 }}>
              {colors.map((color, index) => {
                return (
                  <Color
                    key={index}
                    color={color}
                    onClick={() => formik.setFieldValue("color", index)}
                    isSelected={formik.values.color === index && true}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="is-flex is-justify-content-end" style={{ gap: 10 }}>
          <button className="button is-danger">Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default Pomodoro;
