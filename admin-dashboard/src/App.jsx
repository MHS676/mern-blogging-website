import { Route, Routes } from "react-router-dom";
import './App.css'
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function App() {

  return (
    <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Dashboard/>}/>
        </Route>
    </Routes>
  )
}

export default App
