import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { createUser } from '../../redux/features/loginSlice';
import { useAppDispatch } from '../../redux/store';
import Form from '../../components/form/Form';
import { formInput } from '../../components/form/types';

export function Register() {
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<formInput> = (data) => {
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
