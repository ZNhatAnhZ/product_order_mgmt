import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ToastContainer} from "react-toastify";
import {AuthProvider} from "../../contexts/AuthContextProvider.jsx";
import React from "react";
import Layout from "./Layout.jsx";

const queryClient = new QueryClient()

export default function App({children}) {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer/>
            <AuthProvider>
                <Layout>{children}</Layout>
            </AuthProvider>
        </QueryClientProvider>
    )
}
