import {useNavigate} from 'react-router-dom';
import NavBar from "../component/NavBar";
import LoginComponent from "../component/LoginComponent";
import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import Toast from 'react-bootstrap/Toast';

const SignUp = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [registerButtonDisabled, setRegisterButtonDisabled] = useState(false);
    const [invalidRegister, setInvalidRegister] = useState(false)
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })

        if (!!errors[field]) {
            setErrors({
                ...errors,
                [field]: null
            })
        }
    }

    const validateForm = () => {
        const {email, name, surname, password, passwordre} = form;
        const newErrors = {};
        if (!email || email === '')
            newErrors.email = 'Please enter a email address'
        else if (email.length < 5)
            newErrors.email = 'Please enter a valid email address';

        if (!name || name === '')
            newErrors.name = 'Please enter a name'

        if (!surname || surname === '')
            newErrors.surname = 'Please enter a surname'

        if (!password || password === '')
            newErrors.password = 'Please enter a password'

        if (!passwordre || passwordre === '')
            newErrors.passwordre = 'Please enter  your password again';
        else if (password != passwordre) {
            newErrors.passwordre = 'Please enter  same password';
        }


        return newErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {

            const payload = {
                "firstname": form.name,
                "lastname": form.surname,
                "email": form.email,
                "password": form.password,
                "role": "ADMIN"
            };
            try {
                let response = await axios.post("http://localhost:8090/api/v1/auth/register", payload);


                if (response.status == 200) {

                    if (!response.data.errors) {
                        setRegisterButtonDisabled(true);
                        setInvalidRegister(false);
                    } else if (response.data.errors.length > 0 && response.data.errors != null) {
                        setInvalidRegister(true);
                    }

                }

            } catch (error) {

            }
            // http://localhost:8090/api/v1/auth/register
        }

    }


    return (
        <Container>
            <br/>
            <p>Sign Up: </p>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                                  value={form.email}
                                  onChange={(e) => setField("email", e.target.value)}
                                  isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name"
                                  value={form.name}
                                  onChange={(e) => setField("name", e.target.value)}
                                  isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSurName">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type="text" placeholder="Enter surname"
                                  value={form.surname}
                                  onChange={(e) => setField("surname", e.target.value)}
                                  isInvalid={!!errors.surname}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.surname}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password"
                                  value={form.password}
                                  onChange={(e) => setField("password", e.target.value)}
                                  isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>Password Re</Form.Label>
                    <Form.Control type="password" placeholder="Enter password again"
                                  onChange={(e) => setField("passwordre", e.target.value)}
                                  isInvalid={!!errors.passwordre}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.passwordre}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" onClick={handleSubmit} disabled={registerButtonDisabled}>Şifremi Yenile</Button>
            </Form>
            <Toast className="d-inline-block m-1" show={registerButtonDisabled}
                   bg="info" delay={3000}
                   onClose={false} animation={true}>
                <Toast.Header closeButton={false}>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Succeed</strong>

                </Toast.Header>
                <Toast.Body className="primary">You have registered the system</Toast.Body>
            </Toast>

            <Toast className="d-inline-block m-1" show={invalidRegister}
                   bg="danger" delay={3000}
                   onClose={false} animation={true}>
                <Toast.Header closeButton={false}>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Error</strong>

                </Toast.Header>
                <Toast.Body className="danger">There are too many user with this email.</Toast.Body>
            </Toast>
        </Container>
    );
};

export default SignUp;