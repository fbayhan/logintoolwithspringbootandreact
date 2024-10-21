import { useNavigate } from 'react-router-dom';
import NavBar from "../component/NavBar";
import MenuComponent from "../headercomponent/MenuComponent";

const NormalUser = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
           <MenuComponent></MenuComponent>

        </div>
    );
};

export default NormalUser;