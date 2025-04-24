import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import bg from "./assets/images/bg.png";
import Terms from "./pages/Terms";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="*"
          element={
            <div className="font-roboto font-bold text-black-primary text-[60px] mt-[40px]">
              ERR 404
            </div>
          }
        />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </Router>
  );
}

export default App;
