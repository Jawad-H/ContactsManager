import React from "react";
import styled from "styled-components";
import { Add } from "@material-ui/icons";
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiCalls";
import { Link } from "react-router-dom";
const Container = styled.div`
  height: 60px;
 
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-box-shadow: -1px 3px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: -1px 3px 5px 0px rgba(0,0,0,0.75);
  box-shadow: -1px 3px 5px 0px rgba(0,0,0,0.75);
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Icon = styled.div`
    cursor: pointer;
`;


const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Username = styled.h3`

`;

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  return (
    <Container>
      <Wrapper>
        <Left>
          <Icon>
            <Link to="/add">
              <Add fontSize="medium" />
            </Link>
          </Icon>
        </Left>
        <Right>
          <MenuItem>
            <Username>{user?.username}</Username>
          </MenuItem>
          <MenuItem><LogoutIcon fontSize="medium" onClick={() => logout(dispatch, { user })} /></MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
