import {Col, Container, Form, Row, Button} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import {AsyncTypeahead} from 'react-bootstrap-typeahead';



const Category = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<Items[]>([]);


    const handleSearch = async (query) => {
        console.log("aranıyor " + query)
        setIsLoading(true);
        const searchResult = await searchCategory(query);

        console.log("options");
        setOptions(searchResult.data)
    }
    const filterBy = () => true;

    /*
     const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
     */

    const [categoryName, setCategoryName] = useState('');
    const [errors, setErrors] = useState([]);


    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(categoryName)
        console.log("Merhaba")
        const searchResults = await searchCategory();

        console.log("Merhaba")
        console.log(options);
        console.log("Merhaba")
        console.log(options);
    }

    const searchCategory = async (query) => {
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };
        try {
            console.log("search category çalışıyor");
            const searchresult = await axios.get("http://localhost:8090/api/v1/category/searchcategory/" + query, config);
            return searchresult;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Container>
                <div className="login-wrapper">
                    <div className="login-form-container">
                        <h3 className="login-title">Category</h3>

                        <Form onSubmit={handleSubmit} className="login-form">
                            <Form.Group className="mb-3" controlId="categoryName">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter category name"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    isInvalid={!!errors.categoryName}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="upperCategory">
                                <Form.Label>Upper Category</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Form.Group>

                            <Form className="Group" className="mb-3">

                                <AsyncTypeahead
                                    filterBy={filterBy}
                                    id="async-example"
                                    isLoading={isLoading}
                                    labelKey="login"
                                    minLength={3}
                                    onSearch={handleSearch}
                                    options={options}
                                    placeholder="Search for a Github user..."
                                    renderMenuItemChildren={() => (
                                        <span>{options.categoryName}</span> // Her bir option için categoryName gösteriliyor
                                    )}
                                />
                            </Form>

                            <Row className="justify-content-md-center">
                                <Col xs lg="2">
                                    <Button variant="primary" type="submit" className="login-button">
                                        Add Category
                                    </Button>
                                </Col>

                            </Row>
                        </Form>


                    </div>
                </div>

            </Container>


        </div>
    )

}
export default Category;

