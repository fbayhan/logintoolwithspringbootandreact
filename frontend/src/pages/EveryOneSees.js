import { useNavigate } from 'react-router-dom';
import NavBar from "../component/NavBar";

const EveryOneSees = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <NavBar></NavBar>
            EveryOneSees
        </div>
    );
};

export default EveryOneSees;