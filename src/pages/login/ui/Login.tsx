import React, { useState } from 'react';
import { auth } from '../../../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../../app/store';
import { setActiveUser, setUserLogOut } from '../../../features/loginSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { Inputs } from '../../../common/components/form/password';
import s from '../../../common/components/form/form.module.css';
import { Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../../common/constants/routes';

export function Login() {
    const dispatch = useDispatch();
    const error = useSelector<AppRootStateType, string | null>((state) => state.login.errorText);
    const isAuth = useSelector<AppRootStateType, boolean>((state) => state.login.isAuth);

    let [email, setEmail] = useState<string>('nata@gmail.com');
    let [password, setPassword] = useState<string>('12345');

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

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log('Send from form:' + data);

    return (
        <div className={s.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
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
                    className={s.input}
                    autoComplete={'off'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.currentTarget.value);
                    }}
                    value={email}
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
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.currentTarget.value);
                    }}
                />
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => <div className={s.error}>{message}</div>}
                />

                <div className={s.blockRegistration}>
                    <div className={s.regText}>Don't have an account?</div>
                    <div>
                        <NavLink to={PATH.REGISTER} className={s.regLink}>
                            Registration
                        </NavLink>
                    </div>
                </div>
            </form>
        </div>
    );
}
