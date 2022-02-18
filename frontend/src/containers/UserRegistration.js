import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { API } from "aws-amplify";

export default function UserRegistration() {
  const file = useRef(null);
  const history = useHistory();
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return name.length > 0 && age > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
        await createNote({
            name,
            age
        });
        history.push("/");
      } catch (e) {
        alert(e.message);
        setIsLoading(false);
      }
  }

  function createNote(user) {
    return API.post("user", "/user", {
      body: user
    });
  }

  return (
    <div className="NewNote">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </Form>
    </div>
  );
}