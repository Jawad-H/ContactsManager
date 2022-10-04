import React from 'react'
import styled from "styled-components";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";

const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:100vh;
    background-color: 
`;

const Input = styled.input`
    padding:10px;
    outline:none;
    margin-bottom:20px;
    width:20%;
    border: 2px solid lightgray;
    border-radius: 10px;
`;

const Button = styled.button`
    background-color: teal;
    border:none;
    padding:10px;
    color:white;
    border-radius:5px;
    cursor:pointer;
    width:15%;
`;
const Title = styled.h2`
    padding:30px;
`;

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error, registerUser } = useSelector((state) => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        register(dispatch, { username, email, password });

    };

    return (
        <Container>
            <Title>Register User</Title>
            <Input
                placeholder="Enter Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleClick}>
                <AppRegistrationIcon />
            </Button>
            or
            <Button>
                <Link to="/login" style={{ color: "white" }}>
                    <ArrowBackIcon />
                </Link>

            </Button>
            {registerUser && <Redirect to="/login" />}
        </Container>
    )
}

export default Register