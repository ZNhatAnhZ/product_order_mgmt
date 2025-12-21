import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import styled from "styled-components";
import UtilsArea from "./UtilsArea.jsx";
import {ToastContainer} from "react-toastify";
import {AuthProvider} from "../contexts/AuthContextProvider.jsx";

const queryClient = new QueryClient()

const BackgroundDiv = styled.div`
    background-color: #FFFFFF;
    color: #242424;
    display: flex;
    min-height: 100vh;
    min-width: 100vw;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AppAreaDiv = styled.div`
    padding: 20px 32px;
    border: 1px solid #242424;
    border-radius: 1em;
    display: flex;
    flex-direction: column;
`;

export default function App({children}) {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer/>
            <AuthProvider>
                <BackgroundDiv>
                    <AppAreaDiv>
                        <UtilsArea/>
                        {children}
                    </AppAreaDiv>
                </BackgroundDiv>
            </AuthProvider>
        </QueryClientProvider>
    )
}
