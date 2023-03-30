import Header from "./components/Header";
import AppRoutes from "./AppRoutes";
import Footer from "./components/Footer";
import "./styles/App.css";
import Toggle from "./components/Toggle";
import { useSelector } from "react-redux";

function App() {
  const mode = useSelector((state) => state.mode);
  return (
    <>
      <div data-theme={mode} className="App">
        <Header />
        <main className="main">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
