import React from 'react';
import s from './login.module.css';
import { Form } from '../../../common/components/form/Form';

export function Login() {
    return (
        <div className={s.mainContainer}>
            <Form />
        </div>
    );
}
