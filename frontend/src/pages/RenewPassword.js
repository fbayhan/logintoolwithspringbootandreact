import {useNavigate} from 'react-router-dom';
import NavBar from "../component/NavBar";
import LoginComponent from "../component/LoginComponent";
import {Container, Form, Button} from "react-bootstrap";

const RenewPassword = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <br/>
            <p>Renew your email:</p>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                </Form.Group>

                <Button type="submit">Şifremi Yenile</Button>
            </Form>
        </Container>
    );
};

export default RenewPassword;