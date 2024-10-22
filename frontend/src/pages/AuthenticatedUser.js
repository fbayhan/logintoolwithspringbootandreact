import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import Login from "./Login";
import NormalUser from "./NormalUser";
import EveryOneSees from "./EveryOneSees";
import ExclusiveUser from "./ExclusiveUser";
import SignUp from "./SignUp";
import RenewPassword from "./RenewPassword";
import TODO from "./TODO";
import Item from "./Item";
import Category from "./Category";
import MenuComponent from "../headercomponent/MenuComponent";
import Dashboard from "./Dashboard";

function AuthenticatedUser() {
    return (
        <>
            <MenuComponent></MenuComponent>


            <Routes>
                <Route path="/todo" element={<TODO/>}/>
                <Route path="/item" element={<Item/>}/>
                <Route path="/category" element={<Category/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </>
    );
}

export default AuthenticatedUser;