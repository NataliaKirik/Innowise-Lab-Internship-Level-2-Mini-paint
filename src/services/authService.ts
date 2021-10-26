import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const registerUser = (email: string, password: string): Promise<any> => {
    return createUserWithEmailAndPassword(auth, email, password).then((resp) => {
        return resp.user;
    });
};
export const loginUser = (email: string, password: string): Promise<any> => {
    return signInWithEmailAndPassword(auth, email, password).then((resp) => {
        return resp.user;
    });
};

export const logOutUser = (): Promise<void> => signOut(auth);
