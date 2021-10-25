import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Inputs } from '../../components/form/types';
import { createUser } from '../../redux/features/loginSlice';
import { useAppDispatch } from '../../redux/store';
import Form from '../../components/form/Form';

export function Register() {
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(
            createUser({
                email: data.email,
                password: data.password_repeat,
            }),
        );
    };
    return (
        <Form
            onSubmit={onSubmit}
            showBlockConfirmPassword={true}
            showBlockToRegistration={false}
            buttonName={'Registration'}
        />
    );
}
