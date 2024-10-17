import React, {useState} from 'react';
import {Form, Button, Container, Row, Col, Alert} from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

function LoginComponent() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigation = useNavigate();
    const validateForm = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        return newErrors;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setErrors({});
            console.log('Login attempted with:', {email, password});


            const payload = {
                "email": email,
                "password": password,
            };


            try {
                const token = await axios.post("http://localhost:8090/api/v1/auth/authenticate", payload);
                console.log(token)
                localStorage.setItem("token", token.data.access_token);
                localStorage.setItem("refreshToken", token.data.refresh_token);
                console.log(token.data.access_token)
                console.log("Fatih")
                const decoded = jwtDecode(token.data.access_token);
                console.log(decoded)

                console.log(token);
                navigation("/normaluser");
            } catch (error) {
                return error;
            }
        }
    };

    return (

        <Container>
            <div className="login-wrapper">
                <div className="login-form-container">
                    <h2 className="login-title">Login</h2>

                    <Form onSubmit={handleSubmit} className="login-form">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Row className="justify-content-md-center">
                            <Col xs lg="2">
                                <Button variant="primary" type="submit" className="login-button">
                                    Sign In
                                </Button>
                            </Col>
                            <Col xs lg="2"><Link to="/signup">Sign Up</Link></Col>
                            <Col xs lg="2"><Link to="/renewpassword">Renew Password</Link></Col>

                        </Row>
                    </Form>
                </div>
            </div>
        </Container>

    );

}

export default LoginComponent;