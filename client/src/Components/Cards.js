import styled from "styled-components";
import { Person } from '@material-ui/icons';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const Container = styled.div`
    margin-top:20px;
    margin-left:20px;

`;
const Wrapper = styled.div``;
const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 40px;
    padding: 70px 20px 20px;
`;


const Box = styled.div`
    padding: 20px;
    border-radius: 5px;
    background-color: white;
    border: 1px solid lightgrey;
    text-align: center;
    transition: all 0.5s ease 0s;
    height:50%;
`;
const Icon = styled.div`
display:flex;
align-items: center;
justify-content: center;
`;
const Title = styled.h3`
    color:#453C41;
    font-size:25px;
`;


const Lnk = styled.button`
    margin-top:30px;
    border:none;
    background-color:white;
    cursor:pointer;
    color:teal;
   

`;


function Cards() {
    const user = useSelector((state) => state.user.currentUser);
    const [username, setUsername] = useState(user.username);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const getContacts = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/contact/?username=${username}`);
                setContacts(res.data);
            } catch { }
        };
        getContacts();

    }, [username]);



    // Delete
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/contact/delete/${id}`);
            setContacts(res.data.data);
            toast.error(res.data.message);
        } catch (err) {

        }
    }

    // Save File
    const saveFile = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/contact/save/${id}`);
            toast.success(`${res.data.message}`);
        } catch (err) {

        }
    }



    return (
        <Container>
            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="dark"
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Wrapper>
                <CardWrapper>
                    {contacts.map((contact) => {
                        return (
                            <Box key={contact._id}>
                                <Icon>
                                    <Person fontSize="large" style={{ color: '#453C41' }} />
                                    <Title>
                                        {contact.firstname}
                                    </Title>
                                </Icon>
                                <Lnk>
                                    <Link to={`/contact/${contact._id}`}>
                                        <VisibilityIcon style={{ paddingRight: '10', color: 'teal' }} />
                                    </Link>
                                    <DownloadIcon style={{ color: 'teal' }} onClick={((contact_id) => saveFile(contact._id))} />
                                    <DeleteIcon style={{ paddingLeft: '10', color: 'teal' }} onClick={((contact_id) => handleDelete(contact._id))} />
                                </Lnk>
                            </Box>
                        )
                    })}
                </CardWrapper>
            </Wrapper>
        </Container>

    )
}

export default Cards