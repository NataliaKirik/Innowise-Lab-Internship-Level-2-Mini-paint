import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { dataBase } from '../firebase/firebase';

export const getUsersEmail = async () => {
    const querySnapshot = await getDocs(query(collection(dataBase, 'artCollection')));
    return querySnapshot.docs.map((doc) => {
        return doc.data().userEmail;
    });
};

export const getArt = async (userEmail: string) => {
    let q = await query(collection(dataBase, 'artCollection'));
    if (userEmail) {
        debugger;
        q = await query(collection(dataBase, 'artCollection'), where('userEmail', '==', userEmail));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
        return {
            image: doc.data().canvasDataUrl,
        };
    });
};

export const saveArt = async (userEmail: string, userId: string, canvasDataUrl: string) => {
    const artRef = collection(dataBase, 'artCollection');
    await addDoc(artRef, {
        userEmail,
        userId,
        canvasDataUrl,
    });
};
