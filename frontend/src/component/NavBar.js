import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/"     className={({ isActive }) => {
                        return isActive ? "active-link" : "";
                    }} >Home</NavLink>
                </li>
                <li>
                    <NavLink to="/admin"     className={({ isActive }) => {
                        return isActive ? "active-link" : "";
                    }} >admin</NavLink>
                </li>
                <li>
                    <NavLink to="/login"     className={({ isActive }) => {
                        return isActive ? "active-link" : "";
                    }} >login</NavLink>
                </li>
                <li>
                    <NavLink to="/normaluser"     className={({ isActive }) => {
                        return isActive ? "active-link" : "";
                    }} >normaluser</NavLink>
                </li>
                <li>
                    <NavLink to="/everyonesees"     className={({ isActive }) => {
                        return isActive ? "active-link" : "";
                    }} >everyonesees</NavLink>
                </li>
                <li>
                    <NavLink to="/exclusiveuser"     className={({ isActive }) => {
                        return isActive ? "active-link" : "";
                    }} >exclusiveuser</NavLink>
                </li>

            </ul>
        </nav>
    );
};

export default NavBar;