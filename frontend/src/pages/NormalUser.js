import { useNavigate } from 'react-router-dom';
import NavBar from "../component/NavBar";

const NormalUser = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <NavBar></NavBar>
            NormalUser
        </div>
    );
};

export default NormalUser;