import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {UserSchema} from '../schemas/UserSchema.js';
import {Input} from "../components/Input.jsx";
import useAuth from '../hooks/useAuth.js';
import {checkCredentials, sleep} from "../utils/Utils.js";
import {toast} from "react-toastify";
import {ErrorMessage} from "../components/ErrorMessage.jsx";

export const Login = () => {
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting, isValid}
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(UserSchema)
    });

    const onSubmit = async (data) => {
        console.log('Login form data:', data);

        if (checkCredentials(data)) {
            await sleep(1000);
            const userData = {
                email: data.email,
                rememberMe: data.rememberMe
            };
            login(userData);
            toast.success('Logged in successfully!');
        } else {
            toast.error('Invalid email or password.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Login</h2>
            <div>
                <label htmlFor="email">Email</label>
                <Input
                    id="email"
                    type="text"
                    {...register('email')}
                    placeholder="Enter your email"
                />
                {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    {...register('password')}
                    className={errors.password ? 'error' : ''}
                    placeholder="Enter your password"
                />
                {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
            </div>

            <div>
                <label>
                    <input
                        type="checkbox"
                        {...register('rememberMe')}
                    />
                    Remember me
                </label>
            </div>

            <button
                type="submit"
                disabled={isSubmitting || !isValid}>
                {isSubmitting ? 'Logging in...' : 'Submit'}
            </button>
        </form>
    );
};
