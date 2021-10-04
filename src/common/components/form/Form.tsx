import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import s from './form.module.css';

type Inputs = {
    email: string;
    password: string;
};

export function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log('Send from form:' + data);

    return (
        <div>
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
                />
                {errors.email && <span>Email error</span>}
                {errors.password && <span>This field is required</span>}

                <div className={s.buttons}>
                    <Button variant={'contained'} type={'submit'}>
                        Sign in
                    </Button>
                    <Button variant={'contained'} type={'submit'}>
                        Registration
                    </Button>
                </div>
            </form>
        </div>
    );
}
