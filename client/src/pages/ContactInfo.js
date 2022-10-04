import React from 'react'
import Navbar from '../Components/Navbar'
import styled from 'styled-components';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import axios from "axios";
const Container = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    padding:0;
    margin:0;

`
const Left = styled.div`
`;
const Right = styled.div`
    margin-right:50vh;   
`;
const FirstName = styled.h3`
    padding:20px;
`;
const LastName = styled.h4`
    padding:20px;

`;
const Email = styled.h4`
    padding:20px;

`;
const Number = styled.h4`
    padding:20px;

`;
const BackIcon = styled.span`
    padding:20px;
`;

function ContactInfo() {
    const location = useLocation();
    const contactId = location.pathname.split("/")[2];
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const user = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        const getContact = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/contact/find/${contactId}`);
                const { firstname, lastname, email, number } = res.data;
                setFirstname(firstname);
                setLastname(lastname);
                setEmail(email);
                setNumber(number);
            } catch (err) {

            }
        }
        getContact();
    }, [contactId]);


    return (
        <>
            <Navbar />
            <BackIcon>
                <Link to="/home">
                    <ArrowBackIcon fontSize="large" style={{ color: "black" }} />
                </Link>
            </BackIcon>
            <Container>
                <Left>
                    <AccountBoxIcon style={{ fontSize: 400, color: 'lightcoral' }} />
                </Left>
                <Right>
                    <FirstName>{firstname}</FirstName>
                    <LastName>{lastname}</LastName>
                    <Email>{email}</Email>
                    <Number>{number}</Number>
                </Right>
            </Container>
        </>

    )
}

export default ContactInfo