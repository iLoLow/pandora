import Header from "./components/Layout/Header";
import AppRoutes from "./AppRoutes";
import Footer from "./components/Layout/Footer";
import "./styles/App.css";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setVisitorId } from "./state";
import { v4 as uuidv4 } from "uuid";

function App() {
  const { mode, visitorId } = useSelector((state) => state);

  const dispatch = useDispatch();

  if (!visitorId) {
    dispatch(setVisitorId(uuidv4()));
  }

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
