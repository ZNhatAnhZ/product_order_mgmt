import styled from "styled-components";
import useAuth from "../hooks/useAuth.js";
import {useNavigate} from "react-router";

const UtilsAreaDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.5em;
    border-bottom: 1px solid #242424';
`;

export default function UtilsArea() {
    const { logout, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const onClickAuth = () => {
        return () => {
            if (isAuthenticated) {
                logout();
                navigate('/login');
            } else {
                navigate('/login');
            }
        };
    }

    return <UtilsAreaDiv>
        {isAuthenticated ? <h2>|Welcome {user.email}|</h2> : null}
        <button onClick={onClickAuth()}>
            {isAuthenticated ? "Logout" : "Login"}
        </button>
    </UtilsAreaDiv>
}