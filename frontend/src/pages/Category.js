import {Col, Container, Form, Row, Button} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Category = () => {


    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);

    const [upperCategoryId, setUpperCategoryId] = useState(null);
    const [categoryName, setCategoryName] = useState('');

    const [errors, setErrors] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };

    const handleSearch = async (query) => {

        setIsLoading(true);
        const searchResult = await searchCategory(query);
        setOptions(searchResult.data);
        setIsLoading(false)
    }

    const getAllCategories = async () => {

        const categories = await axios.get("http://localhost:8090/api/v1/category/allcategories", config);
        setAllCategories(categories.data);
        console.log(allCategories)


    }

    useEffect(() => {
        getAllCategories();
    }, []);

    const filterBy = () => true;


    const handleSubmit = async (event) => {
        event.preventDefault();
        let payload = {
            "categoryName": categoryName,
            "uppperCategoryId": upperCategoryId
        }
        console.log(payload)
        console.log("handle submit çalışıyor")
        const addedCategory = await axios.post("http://localhost:8090/api/v1/category/category", payload, config);
        console.log(addedCategory)
    }

    const searchCategory = async (query) => {

        try {
            const searchresult = await axios.get("http://localhost:8090/api/v1/category/searchcategory/" + query, config);
            return searchresult;
        } catch (error) {
            console.log(error);
        }
    }

    const handleCategoryChange = (selected) => {
        if (selected.length > 0) {
            setUpperCategoryId(selected[0].categoryId);
        }
    }

    const editCategory = (categoryId) => {
        console.log("Edit category "+ categoryId)
    }
    const deleteCategory = (categoryId) => {
        console.log("Delete category "+ categoryId)
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


                            <Form.Group className="Group" className="mb-3">
                                <Form.Label>Upper Category</Form.Label>
                                <AsyncTypeahead
                                    filterBy={filterBy}
                                    id="async-example"
                                    isLoading={isLoading}
                                    labelKey="categoryName"
                                    valueKey="categoryId"
                                    minLength={3}
                                    onSearch={handleSearch}
                                    options={options}
                                    placeholder="Search for a category..."
                                    onChange={handleCategoryChange}
                                />
                            </Form.Group>

                            <Row className="justify-content-md-center">
                                <Col xs lg="2">
                                    <Button variant="primary" type="submit" className="login-button">
                                        Add Category
                                    </Button>


                                </Col>

                            </Row>
                        </Form>


                    </div>
                    <div>

                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Category Name</th>
                                <th>Upper Category</th>
                                <th>Operations</th>
                            </tr>
                            </thead>
                            <tbody>
                            {allCategories.map((cat, index) => (
                                <tr key={cat.categoryId}>
                                    <td>{index + 1}</td>
                                    <td>{cat.categoryName}</td>
                                    <td>{cat.upperCategory ? cat.upperCategory.categoryName : 'No Upper Category'}</td>
                                    <td>
                                        <ButtonGroup className="mb-2">
                                            <Button variant="success" onClick={() => editCategory(cat.categoryId)} >Edit</Button>
                                            <Button variant="danger" onClick={() => deleteCategory(cat.categoryId)} >Delete</Button>
                                        </ButtonGroup>

                                    </td>
                                </tr>
                            ))
                            }

                            </tbody>
                        </Table>
                    </div>

                </div>

            </Container>


        </div>
    )

}
export default Category;

