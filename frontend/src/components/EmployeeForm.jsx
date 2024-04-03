import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import Home from "./Home";
import Search from "./Search";
import { BASE_URL } from "../config";

const EmployeeForm = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    exp: "",
    salary: "",
  });

  const [users, setUsers] = useState([]);
  const [isEdit, setEdit] = useState(null);
  const [searchQuery, setSearch] = useState("");

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      //update
      const response = await axios.put(
        `${BASE_URL}/update?id=${isEdit._id}`,
        form
      );
    } else {
      const response = await axios.post(`${BASE_URL}/create`, form);
    }
    setEdit(null);
    fetchUsers();
  };

  const handleEdit = async (item) => {
    setEdit(item);
    setForm({
      name: item.name,
      age: item.age,
      exp: item.exp,
      salary: item.salary,
    });
  };

  const fetchUsers = async () => {
    const response = await axios.get(`${BASE_URL}/get`);
    setUsers(response.data);
  };

  const handleCancel = () => {
    setForm({
      name: "",
      age: "",
      exp: "",
      salary: "",
    });
    setEdit(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `${BASE_URL}/search?search=${searchQuery}`
    );
    setUsers(response.data);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h2>Employee Form</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={form.name}
              onChange={handleOnChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Age"
              name="age"
              value={form.age}
              onChange={handleOnChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Experience"
              name="exp"
              value={form.exp}
              onChange={handleOnChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Salary"
              name="salary"
              value={form.salary}
              onChange={handleOnChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {isEdit ? "Update" : "Submit"}
          </Button>
          {isEdit ? (
            <Button variant="secondary" type="button" onClick={handleCancel}>
              Cancel
            </Button>
          ) : (
            ""
          )}
        </Form>
        <Search
          handleSearch={handleSearch}
          handleSearchChange={handleSearchChange}
          searchQuery={searchQuery}
        />
        <Home handleEdit={handleEdit} fetchUsers={fetchUsers} users={users} />
      </Col>
    </Row>
  );
};

export default EmployeeForm;
