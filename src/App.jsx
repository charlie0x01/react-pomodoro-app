import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import StartSection from "./sections/StartSection";
import { PomodoroContextProvider } from "./PomoContext";

function App() {
  return (
    <>
      <PomodoroContextProvider>
        <Navbar />
        <StartSection />
      </PomodoroContextProvider>
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
