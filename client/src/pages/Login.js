import React from 'react'
import styled from "styled-components";
import LockIcon from "@material-ui/icons/Lock"
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
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
const Icon = styled.div`
    margin-bottom:30px;

`;
const Button = styled.button`
    background-color: teal;
    border:none;
    padding:10px;
    color:white;
    border-radius:5px;
    cursor:pointer;
    width:10%;
`;
const ContainerButtons = styled.div`

`;

const Error = styled.span`
  color: red;
`;

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);

    console.log(error);
    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });

    };



    return (
        <Container>
            <Icon>
                <LockIcon fontSize="large" />
            </Icon>
            <Input
                placeholder="Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                onClick={handleClick} disabled={isFetching}><LoginIcon /></Button>
            or
            <Button>
                <Link to="/register" style={{ color: 'white' }}>
                    <AppRegistrationIcon />
                </Link>
            </Button>
            {/* {error && <Error>Something went wrong...</Error>} */}
        </Container>


    )
}

export default Login;