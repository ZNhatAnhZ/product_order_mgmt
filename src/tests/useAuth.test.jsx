import {renderHook, act, waitFor} from '@testing-library/react';
import {AuthProvider} from '../contexts/AuthContextProvider.jsx';
import useAuth from '../hooks/useAuth.js';
import * as Utils from '../utils/Utils.js';
import {toast} from 'react-toastify';

describe('useAuth Hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        Utils.sleep.mockResolvedValue();
    });

    const wrapper = ({children}) => <AuthProvider>{children}</AuthProvider>;

    it('Initial State should return default unauthenticated state', () => {
        const {result} = renderHook(() => useAuth(), {wrapper});

        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.user).toBeNull();
        expect(typeof result.current.login).toBe('function');
        expect(typeof result.current.logout).toBe('function');
    });

    it('should successfully login with valid credentials', async () => {
        Utils.checkCredentials.mockReturnValue(true);

        const {result} = renderHook(() => useAuth(), {wrapper});

        await act(async () => {
            const loginResult = await result.current.login({
                email: 'admin@example.com',
                password: 'admin123',
                rememberMe: true,
            });
            expect(loginResult).toBe(true);
        });

        await waitFor(() => {
            expect(result.current.isAuthenticated).toBe(true);
            expect(result.current.user.email).toBe('admin@example.com');
            expect(result.current.user.isAuthenticated).toBe(true);
        });

        expect(toast.success).toHaveBeenCalledWith('Logged in successfully!');
        expect(Utils.checkCredentials).toHaveBeenCalledWith({
            email: 'admin@example.com',
            password: 'admin123',
            rememberMe: true,
        });
    });

    it('should fail login with invalid credentials', async () => {
        Utils.checkCredentials.mockReturnValue(false);

        const {result} = renderHook(() => useAuth(), {wrapper});

        await act(async () => {
            const loginResult = await result.current.login({
                email: 'wrong@example.com',
                password: 'wrongpassword',
                rememberMe: false,
            });
            expect(loginResult).toBe(false);
        });

        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.user).toBeNull();
        expect(toast.error).toHaveBeenCalledWith('Invalid email or password.');
    });

    it('should successfully logout authenticated user', async () => {
        Utils.checkCredentials.mockReturnValue(true);

        const {result} = renderHook(() => useAuth(), {wrapper});

        await act(async () => {
            await result.current.login({
                email: 'admin@example.com',
                password: 'admin123',
                rememberMe: true,
            });
        });

        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.user).not.toBeNull();

        act(() => {
            result.current.logout();
        });

        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.user).toBeNull();
    });

    it('should handle login function errors gracefully', async () => {
        Utils.checkCredentials.mockImplementation(() => {
            throw new Error('Network error');
        });

        const {result} = renderHook(() => useAuth(), {wrapper});

        await expect(act(async () => {
            await result.current.login({
                email: 'admin@example.com',
                password: 'admin123',
                rememberMe: true,
            });
        })).rejects.toThrow('Network error');
    });
});
