import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Inputs } from '../../components/form/types';
import { authUser } from '../../redux/features/loginSlice';
import { useAppDispatch } from '../../redux/store';
import Form from '../../components/form/Form';

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

    return (
        <Form
            onSubmit={onSubmit}
            showBlockConfirmPassword={false}
            showBlockToRegistration={true}
            buttonName={'Log in'}
        />
    );
}
