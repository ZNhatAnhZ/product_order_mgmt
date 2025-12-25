import React from 'react';
import {AppBar, Toolbar, IconButton, Box, Avatar,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from 'react-router';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth.js';
import {getFirstEmailChar} from "../../utils/Utils.js";

const StyledAppBar = styled(AppBar)`
    background-color: #fff !important;
    color: #000000 !important;
    position: relative !important;
`;

const StyledToolbar = styled(Toolbar)`
    justify-content: space-between !important;
`;

const LeftSection = styled(Box)`
    display: flex !important;
    align-items: center !important;
    gap: 1em !important;
`;

const RightSection = styled(Box)`
    display: flex !important;
    align-items: center !important;
    gap: 1em !important;
`;

const UserSection = styled(Box)`
    display: flex !important;
    align-items: center !important;
    gap: 1em !important;
`;

const StyledAvatar = styled(Avatar)`
    width: 32px !important;
    height: 32px !important;
    font-size: 0.875rem !important;
`;

export default function Header({onToggleMobileMenu}) {
    const {logout, isAuthenticated, user} = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <StyledAppBar>
            <StyledToolbar>
                <LeftSection>
                    <IconButton onClick={onToggleMobileMenu} sx={{display: {xs: 'flex', md: 'none'}}}>
                        <MenuIcon/>
                    </IconButton>
                    <h3>ProductOrderMgmt</h3>
                </LeftSection>

                <RightSection>
                    {isAuthenticated && user ? (
                        <UserSection>
                            <StyledAvatar>{getFirstEmailChar(user.email)}</StyledAvatar>
                            <p>{user.email}</p>
                            <button onClick={handleLogout}>Logout</button>
                        </UserSection>
                    ) : (<button onClick={() => navigate('/login')}>Login</button>)}
                </RightSection>
            </StyledToolbar>
        </StyledAppBar>
    );
}
