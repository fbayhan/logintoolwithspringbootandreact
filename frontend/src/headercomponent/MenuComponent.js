import React from 'react';
import {Container, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

function MenuComponent() {

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userName = decodedToken.username;
    const logout = async () => {
        console.log("logout tıklandı");


        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };
        try {
            const logoutrequest = await axios.post("http://localhost:8090/api/v1/auth/logout", config);
            console.log(logoutrequest);
        } catch (error) {
            console.log("bir hata oldu");
        }
    }

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar>
                    <Container>
                        <Navbar.Brand href="dashboard">Home Management</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="todo">TODO</Nav.Link>
                            <Nav.Link href="category">Category</Nav.Link>
                            <Navbar.Toggle/>
                            <Nav.Link href="item">Item</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="justify-content-end">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Container>
                </Navbar>

                <NavDropdown title={userName} id="basic-nav-dropdown" className="justify-content-end">
                    <NavDropdown.Item href="/login">Sign In</NavDropdown.Item>
                    <NavDropdown.Item href="/signup"> Sign Up </NavDropdown.Item>
                    <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item onClick={logout}>
                        Logout
                    </NavDropdown.Item>
                </NavDropdown>
            </Container>
        </Navbar>

    );
}

export default MenuComponent;