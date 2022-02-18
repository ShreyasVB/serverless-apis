import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../lib/contextLib";
import "./Home.css";
import { API } from 'aws-amplify';
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
  const [users, setUsers] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  function loadUsers() {
    return API.get("user", "/user/getAll");
  }

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const users = await loadUsers();
        setUsers(users);
      } catch (e) {
        alert(e.message);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);

  function renderUsersList(users) {
    return (
      <>
        <LinkContainer to="/user/register">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new user</span>
          </ListGroup.Item>
        </LinkContainer>
        {users.map(({ full_name, email, age }) => (
          <LinkContainer key={email} to={`/user/${full_name}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                Name: {full_name}
              </span>
              <br />
              <span className="text-muted">
                Age: {age}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Home</h1>
        <p className="text-muted">A simple user registartion app</p>
      </div>
    );
  }

  function renderUsers() {
    return (
      <div className="users">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Users List</h2>
        <ListGroup>{!isLoading && renderUsersList(users)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderUsers() : renderLander()}
    </div>
  );
}