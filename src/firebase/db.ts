import { addDoc, collection, getFirestore } from 'firebase/firestore';

export const db = getFirestore();

export const saveArt = async (userEmail: string | null, userId: string | null, canvasDataUrl: string) => {
    const artRef = collection(db, 'artCollection');
    await addDoc(artRef, {
        userEmail,
        userId,
        canvasDataUrl,
    });
};
