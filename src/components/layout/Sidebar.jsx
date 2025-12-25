import React from 'react';
import {Drawer, List, ListItem, useMediaQuery, useTheme} from '@mui/material';
import {Dashboard as DashboardIcon, Inventory as ProductsIcon, ShoppingCart as OrdersIcon} from '@mui/icons-material';
import {NavLink} from 'react-router';
import {styled} from '@mui/material/styles';

const DRAWER_WIDTH = 150;
const COLLAPSED_WIDTH = 60;

const StyledDrawer = styled(Drawer)(({theme, collapsed, variant}) => ({
    width: variant === 'permanent' ? (collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH) : DRAWER_WIDTH,
    '& .MuiDrawer-paper': {
        position: 'sticky',
        width: variant === 'permanent' ? (collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH) : DRAWER_WIDTH,
        backgroundColor: '#dedede',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }
}));

const navItems = [
    {
        path: '/dashboard',
        icon: <DashboardIcon/>,
        text: 'Dashboard'
    },
    {
        path: '/products',
        icon: <ProductsIcon/>,
        text: 'Products'
    },
    {
        path: '/orders',
        icon: <OrdersIcon/>,
        text: 'Orders'
    }
];

export default function Sidebar({mobileOpen, onClose}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // mobile: <768px
    const showOnlyIcons = useMediaQuery(theme.breakpoints.between('md', 'lg')); // tablets: 768px - 1024px

    const drawerContent = (
        <List disablePadding>
            {navItems.map(item =>
                <ListItem key={item.path}>
                    <NavLink to={item.path}>{item.icon} {showOnlyIcons ? null : item.text}</NavLink>
                </ListItem>)
            }
        </List>
    );

    if (isMobile) {
        return (
            <StyledDrawer variant="temporary" open={mobileOpen} onClose={onClose} ModalProps={{keepMounted: true}}
                          sx={{display: {xs: 'block', md: 'none'}}}>
                {drawerContent}
            </StyledDrawer>
        );
    }

    return (
        <StyledDrawer variant="permanent" collapsed={showOnlyIcons} sx={{display: {xs: 'none', md: 'block'}}}>
            {drawerContent}
        </StyledDrawer>
    );
}
