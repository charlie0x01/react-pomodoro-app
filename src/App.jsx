import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

import { PomodoroContextProvider } from "./context/PomoContext";
import UserContext from "./context/UserContext";

import Navbar from "./components/Navbar";
import ContentPage from "./pages/ContentPage";
import LoginPage from "./pages/LoginPage";
import _404Page from "./pages/_404Page";
import { useState, useEffect } from "react";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const [user, setUser] = useState(null);

  function handleLogin(userData) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function handleLogout() {
    setUser(null);
    localStorage.setItem("user", null);
  }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
        <PomodoroContextProvider>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={user === null ? <LoginPage /> : <ContentPage />}
            />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<_404Page />} />
          </Routes>
        </PomodoroContextProvider>
      </UserContext.Provider>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
