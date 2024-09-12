import { useNavigate } from 'react-router-dom';
import NavBar from "../component/NavBar";
import LoginComponent from "../component/LoginComponent";
const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <LoginComponent></LoginComponent>
        </div>
    );
};

export default Login;