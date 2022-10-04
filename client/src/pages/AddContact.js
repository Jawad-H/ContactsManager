import React from 'react'
import styled from "styled-components";
import Navbar from '../Components/Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { userRequest } from "../requestMethods";
import { useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:90vh;
    postition:relative;
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

`
const Button = styled.button`
    background-color: teal;
    border:none;
    padding:10px;
    color:white;
    border-radius:5px;
    cursor:pointer;
    width:15%;
`
const BackIcon = styled.span`
    padding:20px;
`;
const Title = styled.h2`
    padding:30px;
    
`;
function AddContact() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const user = useSelector((state) => state.user.currentUser);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`http://localhost:5000/api/contact/create`, {
                firstname: firstname,
                lastname: lastname,
                email: email,
                number: number,
                username: user?.username,
            })
            history.push("/");
            toast.success("Added Successfully");
        } catch (e) { }
    }


    return (
        <>

            <Navbar />
            <BackIcon>
                <Link to="/home">
                    <ArrowBackIcon fontSize="large" style={{ color: "black" }} />
                </Link>
            </BackIcon>
            <Container>
                <Title>Add Contact</Title>

                <Input
                    type="text"
                    placeholder="Enter FirstName"
                    name="firstname"
                    onChange={(e) => setFirstname(e.target.value)} />
                <Input
                    type="text"
                    placeholder="Enter LastName"
                    name="lastname"
                    onChange={(e) => setLastname(e.target.value)} />
                <Input
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)} />
                <Input
                    type="text"
                    placeholder="Enter Number"
                    name="number"
                    onChange={(e) => setNumber(e.target.value)} />
                <Button onClick={handleSubmit}>ADD</Button>
            </Container>
        </>
    )
}

export default AddContact;