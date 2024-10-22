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
import SignUp from "./pages/SignUp";
import RenewPassword from "./pages/RenewPassword";
import AuthenticatedUser from "./pages/AuthenticatedUser";
import Category from "./pages/Category";
import Item from "./pages/Item";
import TODO from "./pages/TODO";
import Dashboard from "./pages/Dashboard";


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
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/renewpassword" element={<RenewPassword/>}/>
                <Route path="/auth" element={<AuthenticatedUser/>}>
                    <Route path="category" element={< Category/>}/>
                    <Route path="item" element={< Item/>}/>
                    <Route path="todo" element={< TODO/>}/>
                    <Route path="dashboard" element={< Dashboard/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
