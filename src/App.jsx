import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

import { PomodoroContextProvider } from "./context/PomoContext";

import Navbar from "./components/Navbar";
import ContentPage from "./pages/ContentPage";
import _404Page from "./pages/_404Page";

function App() {
  return (
    <>
      <PomodoroContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<ContentPage />} />
          <Route path="*" element={<_404Page />} />
        </Routes>
      </PomodoroContextProvider>
      <ToastContainer />
    </>
  );
}

export default App;
