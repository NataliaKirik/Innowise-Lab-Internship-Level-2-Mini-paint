import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import Form from '../../components/form/Form';
import { formInput } from '../../components/form/types';
import { useDispatch } from 'react-redux';
import { authActionTypes } from '../../redux/types/actionTypes';

export function Register() {
    const dispatch = useDispatch();
    const onSubmit: SubmitHandler<formInput> = (data) => {
        dispatch({
            type: authActionTypes.REGISTER,
            payload: {
                email: data.email,
                password: data.password_repeat,
            },
        });
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
