import {API_BASE_URL} from "../constants/Enum.js";
import {sleep} from "../utils/Utils.js";

export async function fetchData(endpoint) {
    try {
        await sleep(500);
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`API Error fetching ${endpoint}:`, error);
        throw new Error(`Failed to fetch data from ${endpoint}`);
    }
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

// Get all products
export async function getProducts() {
    return await fetchData('/products');
}

// Get all orders
export async function getOrders() {
    return await fetchData('/orders');
}

// Get recent orders (5 most recent)
export async function getRecentOrders() {
    const orders = await fetchData('/orders');
    // Sort by date (newest first) and take first 5
    return orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
}

// Get pending orders only
export async function getPendingOrders() {
    const orders = await fetchData('/orders');
    return orders.filter(order => order.status === 'pending');
}

// Get analytics data
export async function getAnalytics() {
    return await fetchData('/analytics');
}

// Update dashboard stats (for testing purposes)
export async function updateDashboardStats(newStats) {
    try {
        const response = await fetch(`${this.baseURL}/dashboard`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                stats: newStats,
                lastUpdated: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error updating dashboard stats:', error);
        throw new Error('Failed to update dashboard statistics');
    }
}

