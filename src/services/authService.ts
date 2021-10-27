import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const registerUser = async (email: string, password: string) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user;
};
export const loginUser = async (email: string, password: string) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user;
};

export const logOutUser = (): Promise<void> => signOut(auth);
