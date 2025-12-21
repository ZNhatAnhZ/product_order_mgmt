import {Credential} from "../constants/Enum.js";

export const checkCredentials = (data) => {
    return data.email === Credential.email && data.password === Credential.password;
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};