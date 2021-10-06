import React from 'react';
import { TextField } from '@mui/material';
import s from './form.module.css';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';

export type Inputs = {
    email: string;
    password: string;
    password_repeat: string;
};

export const Password = () => {
    const {
        register,
        formState: { errors },
    } = useForm<Inputs>({
        mode: 'onChange',
    });
    return (
        <div>
            <TextField
                {...register('password', {
                    required: {
                        value: true,
                        message: 'Password is required',
                    },
                    minLength: {
                        value: 5,
                        message: 'Password should be at least 5 characters ',
                    },
                    maxLength: {
                        value: 10,
                        message: 'Password should be between 5 and 10 characters',
                    },
                })}
                color={'primary'}
                label={'password'}
                variant={'outlined'}
                className={s.input}
                type="password"
            />
            <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => <div className={s.error}>{message}</div>}
            />
        </div>
    );
};
