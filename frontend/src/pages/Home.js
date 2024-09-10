import {useNavigate} from 'react-router-dom';
import NavBar from "../component/NavBar";

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <NavBar></NavBar>
            <div className="container">
                This is the home page
            </div>
        </>
    );
};

export default Home;