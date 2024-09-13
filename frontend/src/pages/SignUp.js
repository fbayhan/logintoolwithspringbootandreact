import { useNavigate } from 'react-router-dom';
import NavBar from "../component/NavBar";
import LoginComponent from "../component/LoginComponent";
import {Button, Container, Form} from "react-bootstrap";
const SignUp = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <br/>
            <p>Sign Up:</p>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control type="text" placeholder="Enter email"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter email"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password Re</Form.Label>
                    <Form.Control type="password" placeholder="Enter email"/>
                </Form.Group>

                <Button type="submit">Şifremi Yenile</Button>
            </Form>
        </Container>
    );
};

export default SignUp;