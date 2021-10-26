import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

export const registerUser = (email: string, password: string): Promise<string | User | null | undefined> => {
    return createUserWithEmailAndPassword(auth, email, password).then((resp) => {
        return resp.user;
    });
};
export const loginUser = (email: string, password: string): Promise<string | User | null | undefined> => {
    return signInWithEmailAndPassword(auth, email, password).then((resp) => {
        return resp.user;
    });
};

export const logOutUser = (): Promise<void> => signOut(auth);
