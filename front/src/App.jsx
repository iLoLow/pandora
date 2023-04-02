import Header from "./components/Header";
import AppRoutes from "./AppRoutes";
import Footer from "./components/Footer";
import "./styles/App.css";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const mode = useSelector((state) => state.mode);

  return (
    <>
      <div data-theme={mode} className="App">
        <Header />
        <main className="main">
          <ToastContainer
            className="toastify"
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="dark"
          />
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
