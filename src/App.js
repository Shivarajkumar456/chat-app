import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UpdateProfile from "./Components/UpdateProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './style.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/">
        <Route index element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element= {<UpdateProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
