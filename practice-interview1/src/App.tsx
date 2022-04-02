import { Routes, Route } from "react-router-dom";
import CreateElement from "./components/CreateElement";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import UpdateElement from "./components/UpdateElement";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<CreateElement />} />
        <Route path="/elements/:id" element={<UpdateElement />} />
      </Routes>
    </div>
  );
}

export default App;
