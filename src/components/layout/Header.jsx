import React, {useState} from 'react';
import {AppBar, Toolbar, IconButton, Box, Avatar, Button,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from 'react-router';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth.js';
import {getFirstEmailChar} from "../../utils/Utils.js";
import {Modal, ModalActions} from "../common/Modal";

const StyledAppBar = styled(AppBar)`
    background-color: #fff !important;
    color: #000000 !important;
    position: relative !important;
    height: 7vh !important;
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
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login', { viewTransition: true });
    };
    const handleCancel = () => {
        setShowConfirmModal(false);
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
                            <Button onClick={() => setShowConfirmModal(true)}>Logout</Button>
                        </UserSection>
                    ) : (<Button onClick={() => navigate('/login', { viewTransition: true })}>Login</Button>)}
                </RightSection>

                <Modal isOpen={showConfirmModal} onClose={handleCancel}>
                    <h3>Confirm Logout</h3>
                    <p>Are you sure you want to log out?</p>
                    <ModalActions>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button onClick={handleLogout}>Logout</Button>
                    </ModalActions>
                </Modal>
            </StyledToolbar>
        </StyledAppBar>
    );
}
