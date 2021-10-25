import { SubmitHandler } from 'react-hook-form';

export type formPropsType = {
    onSubmit: SubmitHandler<formInput>;
    buttonName: string;
    showBlockConfirmPassword: boolean;
    showBlockToRegistration: boolean;
};

export type formInput = {
    email: string;
    password: string;
    password_repeat: string;
};
