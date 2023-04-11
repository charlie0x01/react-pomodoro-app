import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { toast } from "react-toastify";

const ToastNotification = ({ type, message, duration }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (show === true) {
      const timer = setTimeout(() => {
        setShow(false);
      }, duration || 5000);
    }
    return () => clearTimeout();
  }, [show, duration]);

  return (
    <>
      {show && (
        <div className="toast" style={{ maxWidth: 400 }}>
          <div
            className={`notification is-light notification-animation ${type}`}
          >
            {message}
            <button onClick={() => setShow(false)} className="delete"></button>
          </div>
        </div>
      )}
    </>
  );
};

function Toast(message, type, duration) {
  const div = document.createElement("div");
  document.body.appendChild(div);

  const toastRoot = ReactDOM.createRoot(div);
  toastRoot.render(
    <ToastNotification message={message} type={type} duration={duration} />
  );

  setTimeout(() => {
    toastRoot.unmount();
    document.body.removeChild(div);
  }, duration || 5000);
}

export default Toast;
