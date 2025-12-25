import {API_BASE_URL} from "../constants/Enum.js";
import {sleep} from "../utils/Utils.js";

export async function fetchData(endpoint) {
    await sleep(500);
    let response = null;
    try {
        response = await fetch(`${API_BASE_URL}${endpoint}`);
    } catch (error) {
        throw new Error(`Network error while fetching data from ${endpoint}: ${error.message}`);
    }
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${endpoint} with http error code: ${response.status}`);
    }
    return await response.json();
}

export async function getDashboardStats() {
    const data = await fetchData('/dashboard');
    return {
        totalProducts: {
            value: data.totalProducts.value,
            change: data.totalProducts.change,
            changeType: data.totalProducts.changeType
        },
        totalOrders: {
            value: data.totalOrders.value,
            change: data.totalOrders.change,
            changeType: data.totalOrders.changeType
        },
        pendingOrders: {
            value: data.pendingOrders.value,
            badge: data.pendingOrders.badge,
            status: data.pendingOrders.status
        },
        revenue: {
            value: data.revenue.value,
            change: data.revenue.change,
            changeType: data.revenue.changeType,
            currency: data.revenue.currency
        },
        lastUpdated: new Date().toLocaleString('vi-VN')
    };
}

export async function getProducts() {
    return await fetchData('/products');
}

export async function getRecentOrders() {
    const orders = await fetchData('/orders');
    return orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
}

