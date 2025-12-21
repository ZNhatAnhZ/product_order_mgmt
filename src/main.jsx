import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './assets/index.css'
import { createBrowserRouter } from "react-router";
import {
    RouterProvider,
} from "react-router/dom";
import App from "./components/App.jsx";
import Login from "./routes/Login.jsx";
import {Navigation} from "./routes/Navigation.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App><Navigation/></App>,
    },
    {
        path: "/login",
        element: <App><Login/></App>,
    },
    {
        path: "/dashboard",
        element: <App><ProtectedRoute><Dashboard/></ProtectedRoute></App>,
    },
    {
        path: "/orders",
        element: <App><ProtectedRoute><div>Orders Page - Coming Soon</div></ProtectedRoute></App>,
    },
    {
        path: "/orders/:id",
        element: <App><ProtectedRoute><div>Order Detail Page - Coming Soon</div></ProtectedRoute></App>,
    },
    {
        path: "/products/:id",
        element: <App><ProtectedRoute><div>Product Detail Page - Coming Soon</div></ProtectedRoute></App>,
    },
    {
        path: "*",
        element: <App><p>There's nothing here: 404!</p></App>,
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
