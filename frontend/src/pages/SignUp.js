import {useNavigate} from 'react-router-dom';
import NavBar from "../component/NavBar";
import LoginComponent from "../component/LoginComponent";
import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";

const SignUp = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
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
        const {email, name, surname, password, passwordre } = form;
        const newErrors = {};
        if(!email || email==='')
            newErrors.email='Please enter a email address'
        else if(email.length<5)
            newErrors.email='Please enter a valid email address';

        // name, surname, password, passwordre
        if(!name || name==='')
            newErrors.name='Please enter a name'

        if(!surname || surname==='')
            newErrors.surname='Please enter a surname'

        if(!password || password==='')
            newErrors.password='Please enter a password'

        if(!passwordre || passwordre==='')
            newErrors.passwordre='Please enter  your password again';
        else if(password!=passwordre){
            newErrors.passwordre='Please enter  same password';
        }

        console.log(newErrors)
        return newErrors;
    }

    const handleSubmit = e => {
        e.preventDefault();

        const formErrors = validateForm();
        if(Object.keys(formErrors).length>0){
            setErrors(formErrors);
        }
        else {
            console.log('form submitted');
            console.log(form)
        }
        console.log(form);
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

                <Button type="submit" onClick={handleSubmit}>Şifremi Yenile</Button>
            </Form>
        </Container>
    );
};

export default SignUp;