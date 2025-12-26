import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {UserSchema} from '../schemas/UserSchema.js';
import {Input} from "../components/common/Input.jsx";
import useAuth from '../hooks/useAuth.js';
import {ErrorMessage} from "../components/common/ErrorMessage.jsx";
import {useLocation, useNavigate} from "react-router";
import {Button} from "@mui/material";

export const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting, isValid}
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(UserSchema)
    });

    const onSubmit = async (data) => {
        const userData = {
            email: data.email,
            rememberMe: data.rememberMe,
            password: data.password,
        };
        if (await login(userData)) {
            navigate(location.state?.from || '/dashboard', {viewTransition: true});
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
            <div>
                <label htmlFor="email">Email</label>
                <Input
                    id="email"
                    type="text"
                    {...register('email')}
                    placeholder="Enter your email"
                />
                {errors.email && (<ErrorMessage>{errors.email.message}</ErrorMessage>)}
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <Input
                    id="password"
                    type="password"
                    {...register('password')}
                    placeholder="Enter your password"
                />
                {errors.password && (<ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
            </div>
            <div>
                <input id='rememberMe' type="checkbox" {...register('rememberMe')}/>
                <label htmlFor="rememberMe">Remember me</label>
            </div>
            <Button type="submit" disabled={isSubmitting || !isValid} loading={isSubmitting}>Submit</Button>
        </form>
    );
};
