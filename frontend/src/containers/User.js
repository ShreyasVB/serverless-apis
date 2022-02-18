import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./User.css";

export default function User() {
  const { fullName } = useParams();
  const history = useHistory();
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadUser() {
      return API.get("user", `/user/${fullName}`);
    }

    async function onLoad() {
      try {
        const userData = await loadUser();
        const { full_name, age } = userData;

        setName(full_name);
        setAge(age);
      } catch (e) {
        alert(e.message);
      }
    }

    onLoad();
  }, [fullName]);

  function validateForm() {
    return name.length > 0 && age > 0;
  }
  
  function saveUser(userDetails) {
    return API.put('user', '/user', {
      body: userDetails
    });
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      await saveUser({
        name,
        age,
      });
      history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }
  
  function deleteUser() {
    return API.del("user", `/user/${fullName}`);
  }
  
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
  
    try {
      await deleteUser();
      history.push("/");
    } catch (e) {
      alert(e.message);
      setIsDeleting(false);
    }
  }
  
  return (
    <div className="Users">
      {name && (
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Name</Form.Label>
            <Form.Control
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={true}
            />
            </Form.Group>
            <Form.Group size="lg" controlId="email">
            <Form.Label>Age</Form.Label>
            <Form.Control
                autoFocus
                type="Number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>
          <LoaderButton
            block
            size="lg"
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            size="lg"
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </Form>
      )}
    </div>
  );
}