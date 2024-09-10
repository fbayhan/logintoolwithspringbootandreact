import { useNavigate } from 'react-router-dom';
import NavBar from "../component/NavBar";

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <NavBar></NavBar>
            Login
        </div>
    );
};

export default Login;