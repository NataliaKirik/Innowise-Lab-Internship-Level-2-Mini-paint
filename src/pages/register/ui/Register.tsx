import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import s from './register.module.css';

type Inputs = {
    example: string;
    exampleRequired: string;
};

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <div className={s.mainContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                <div className={s.text}>Email</div>
                <TextField
                    {...register('example')}
                    color={'primary'}
                    label={'email'}
                    variant={'outlined'}
                    className={s.input}
                />
                <div className={s.text}>Password</div>
                <TextField
                    {...register('exampleRequired', { required: true })}
                    color={'primary'}
                    label={'password'}
                    variant={'outlined'}
                    className={s.input}
                    type="password"
                />
                <div className={s.text}>Confirm password</div>
                <TextField
                    {...register('exampleRequired', { required: true })}
                    color={'primary'}
                    label={'password'}
                    variant={'outlined'}
                    className={s.input}
                    type="password"
                />
                {errors.exampleRequired && <span>This field is required</span>}

                <div className={s.buttons}>
                    <Button variant={'contained'}>Registration</Button>
                    <Button variant={'contained'}>Sign in</Button>
                </div>
            </form>
        </div>
    );
}

export default Register;
