import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ show, children }) => {
  if (show === false || show === undefined) return;
  return createPortal(
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content box">{children}</div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default Modal;
