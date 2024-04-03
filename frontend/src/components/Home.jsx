import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { BASE_URL } from "../config";

const Home = ({ handleEdit, fetchUsers, users }) => {
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/delete/${id}`);
    fetchUsers();
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Experience</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((item) => (
          <tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.exp}</td>
            <td>{item.salary}</td>
            <td>
              <Button type="button" onClick={() => handleEdit(item)}>
                Edit
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Home;
