import logo from './logo.svg';
import './App.css';

import {Routes, Route} from "react-router-dom";
import NavBar from "./component/NavBar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NormalUser from "./pages/NormalUser";
import EveryOneSees from "./pages/EveryOneSees";
import ExclusiveUser from "./pages/ExclusiveUser";



function App() {
    return (
        <>


            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/normaluser" element={<NormalUser/>}/>
                <Route path="/everyonesees" element={<EveryOneSees/>}/>
                <Route path="/exclusiveuser" element={<ExclusiveUser/>}/>
            </Routes>
        </>
    );
}

export default App;
