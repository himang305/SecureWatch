import "./output.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import Login1 from "./components/login1.jsx";
import Verify from "./components/verify.jsx";
import Home from "./components/home.jsx";
import Dashboard from "./components/dashboard.jsx";
import Monitor from "./components/monitor.jsx";
import Activity from "./components/activity.jsx";
import Create from "./components/create.jsx";
import Event from "./components/events.jsx";
import Function from "./components/function.jsx";
import Alert from "./components/alert.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login1" element={<Login1 />} />
        <Route path="verify" element={<Verify />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/monitor" element={<Monitor />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/create" element={<Create />} />
        <Route path="/event" element={<Event />} />
        <Route path="/function" element={<Function />} />
        <Route path="/alert" element={<Alert />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
