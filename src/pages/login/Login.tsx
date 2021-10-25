import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { Inputs } from '../../components/form/types';
import s from '../../components/form/form.module.scss';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../components/routes/path';
import { authUser } from '../../redux/features/loginSlice';
import { useAppDispatch } from '../../redux/store';

export function Login() {
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(
            authUser({
                email: data.email,
                password: data.password,
            }),
        );
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    return (
        <div className={s.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.text}>Email</div>
                <TextField
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'Email is required',
                        },
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})$/,
                            message: 'Invalid email',
                        },
                    })}
                    color={'primary'}
                    label={'email'}
                    variant={'outlined'}
                    className={s.textField}
                    autoComplete={'off'}
                />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => <div className={s.error}>{message}</div>}
                />

                <div className={s.text}>Password</div>
                <TextField
                    {...register('password', {
                        required: {
                            value: true,
                            message: 'Password is required',
                        },
                        minLength: {
                            value: 6,
                            message: 'Password should be at least 6 characters ',
                        },
                        maxLength: {
                            value: 12,
                            message: 'Password should be between 6 and 12 characters',
                        },
                    })}
                    color={'primary'}
                    label={'password'}
                    variant={'outlined'}
                    className={s.textField}
                    type="password"
                />
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => <div className={s.error}>{message}</div>}
                />

                <Button variant={'contained'} type={'submit'}>
                    Log in
                </Button>

                <div className={s.blockRegistration}>
                    <div className={s.regText}>Don't have an account?</div>
                    <div>
                        <NavLink to={PATH.REGISTER}>Registration</NavLink>
                    </div>
                </div>
            </form>
        </div>
    );
}
