import {ADMIN_CREDENTIAL, ORDER_STATUS} from "../constants/Enum.js";
import {format} from "date-fns";

export const checkCredentials = (data) => {
    return data.email === ADMIN_CREDENTIAL.email && data.password === ADMIN_CREDENTIAL.password;
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

export const formatDate = (dateString) => {
    return format(new Date(dateString), "HH:MM MM/dd/yyyy");
};

export const getIsoStringDate = () => {
    const now = new Date();
    now.setMilliseconds(0);
    return now.toISOString();
}

export const getStockStatus = (stock) => {
    if (stock < 10) return 'low';
    if (stock <= 50) return 'medium';
    return 'high';
};

export const getAvailableStatuses = (currentStatus) => {
    switch (currentStatus) {
        case ORDER_STATUS.PENDING:
            return [ORDER_STATUS.PROCESSING, ORDER_STATUS.CANCELLED];
        case ORDER_STATUS.PROCESSING:
            return [ORDER_STATUS.COMPLETED, ORDER_STATUS.CANCELLED];
        case ORDER_STATUS.COMPLETED:
        case ORDER_STATUS.CANCELLED:
        default:
            return [];
    }
};

export const getFirstEmailChar = (email) => {
    return email ? email.charAt(0).toUpperCase() : 'U';
};