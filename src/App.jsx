import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { PomodoroContextProvider } from "./PomoContext";
import BodySection from "./sections/bodySection";

function App() {
  return (
    <>
      <PomodoroContextProvider>
        <Navbar />
        <BodySection />
      </PomodoroContextProvider>
      <ToastContainer
        position="top-center"
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
