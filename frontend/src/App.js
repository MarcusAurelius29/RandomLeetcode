import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Help from "./pages/Help";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>

    <Route path="/" element={<Home />}></Route>
    <Route path="/help" element={<Help />}></Route>

    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;