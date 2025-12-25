import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './assets/index.css'
import { createBrowserRouter } from "react-router";
import {RouterProvider,} from "react-router/dom";
import App from "./components/layout/App.jsx";
import {Login} from "./routes/Login.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import ProductList from "./routes/ProductList.jsx";
import ProductDetail from "./routes/ProductDetail.jsx";
import {ProductEdit} from "./routes/ProductEdit.jsx";
import {ProductCreate} from "./routes/ProductCreate.jsx";
import OrderList from "./routes/OrderList.jsx";
import OrderDetail from "./routes/OrderDetail.jsx";
import ProtectedRoute from "./components/route/ProtectedRoute.jsx";
import NotFound from "./routes/NotFound.jsx";

const router = createBrowserRouter([
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
        element: <App><ProtectedRoute><OrderList/></ProtectedRoute></App>,
    },
    {
        path: "/products",
        element: <App><ProtectedRoute><ProductList/></ProtectedRoute></App>,
    },
    {
        path: "/products/new",
        element: <App><ProtectedRoute><ProductCreate/></ProtectedRoute></App>,
    },
    {
        path: "/products/:id",
        element: <App><ProtectedRoute><ProductDetail/></ProtectedRoute></App>,
    },
    {
        path: "/products/:id/edit",
        element: <App><ProtectedRoute><ProductEdit/></ProtectedRoute></App>,
    },
    {
        path: "/orders/:id",
        element: <App><ProtectedRoute><OrderDetail/></ProtectedRoute></App>,
    },
    {
        path: "*",
        element: <App><NotFound/></App>,
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode><RouterProvider router={router}/></StrictMode>,
)
