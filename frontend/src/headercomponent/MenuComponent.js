import React from 'react';
import {Container, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";

function MenuComponent() {
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar>
                    <Container>
                        <Navbar.Brand href="#home">Home Management</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="#home">TODO</Nav.Link>
                            <Nav.Link href="/category">Category</Nav.Link>
                            <Navbar.Toggle/>
                            <Nav.Link href="/item">Item</Nav.Link>
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

                <NavDropdown title="Membership" id="basic-nav-dropdown" className="justify-content-end">
                    <NavDropdown.Item href="/login">Sign In</NavDropdown.Item>
                    <NavDropdown.Item href="/signup"> Sign Up </NavDropdown.Item>
                    <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item href="/logout">
                        Logout
                    </NavDropdown.Item>
                </NavDropdown>
            </Container>
        </Navbar>
        //
        // <Navbar expand="lg" className="bg-body-tertiary">
        //     <Container>
        //         <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        //         <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        //
        //
        //         <Nav.Link href="#home">Home</Nav.Link>
        //         <Nav.Link href="#link">Link</Nav.Link>
        //         <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        //             <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        //             <NavDropdown.Item href="#action/3.2">
        //                 Another action
        //             </NavDropdown.Item>
        //             <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        //             <NavDropdown.Divider/>
        //             <NavDropdown.Item href="#action/3.4">
        //                 Separated link
        //             </NavDropdown.Item>
        //         </NavDropdown>
        //
        //
        //         <Navbar.Collapse className="justify-content-end">
        //             <Navbar.Text>
        //                 Signed in as: <a href="#login">Mark Otto</a>
        //             </Navbar.Text>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>


        // <Navbar inverse collapseOnSelect>
        //     <Navbar.Header>
        //         <Navbar.Brand>
        //             <a href="#brand">React-Bootstrap</a>
        //         </Navbar.Brand>
        //         <Navbar.Toggle />
        //     </Navbar.Header>
        //     <Navbar.Collapse>
        //         <Nav>
        //             <NavItem eventKey={1} href="#">
        //                 Link
        //             </NavItem>
        //             <NavItem eventKey={2} href="#">
        //                 Link
        //             </NavItem>
        //             <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        //                 {/*<MenuItem eventKey={3.1}>Action</MenuItem>*/}
        //                 {/*<MenuItem eventKey={3.2}>Another action</MenuItem>*/}
        //                 {/*<MenuItem eventKey={3.3}>Something else here</MenuItem>*/}
        //                 {/*<MenuItem divider />*/}
        //                 {/*<MenuItem eventKey={3.3}>Separated link</MenuItem>*/}
        //             </NavDropdown>
        //         </Nav>
        //         <Nav pullRight>
        //             <NavItem eventKey={1} href="#">
        //                 Link Right
        //             </NavItem>
        //             <NavItem eventKey={2} href="#">
        //                 Link Right
        //             </NavItem>
        //         </Nav>
        //     </Navbar.Collapse>
        // </Navbar>
    );
}

export default MenuComponent;