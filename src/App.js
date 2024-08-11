import "./App.css";
import Login from "./components/Login";
import Home from "./screen/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from "./components/Signup.js";
import { CardProivider } from "./components/ContextReducer.js";

function App() {
  return (
    <CardProivider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            {/* <Route exact path='/myorder' element={<Signup/>}/> */}
          </Routes>
        </div>
      </Router>
    </CardProivider>
  );
}

export default App;
