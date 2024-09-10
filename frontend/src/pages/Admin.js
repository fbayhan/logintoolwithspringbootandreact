import { useNavigate } from 'react-router-dom';
import NavBar from "../component/NavBar";

const Admin = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <NavBar></NavBar>
            Admin
        </div>
    );
};

export default Admin;