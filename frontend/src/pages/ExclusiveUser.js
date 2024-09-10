import { useNavigate } from 'react-router-dom';
import NavBar from "../component/NavBar";

const ExclusiveUser = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <NavBar></NavBar>
            ExclusiveUser
        </div>
    );
};

export default ExclusiveUser;