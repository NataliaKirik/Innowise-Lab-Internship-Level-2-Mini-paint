import { addDoc, collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';

export const db = getFirestore();

export const saveArt = async (userEmail: string | null, userId: string | null, canvasDataUrl: string) => {
    const artRef = collection(db, 'artCollection');
    const art = await addDoc(artRef, {
        userEmail,
        userId,
        canvasDataUrl,
    });
};

export const getArtCollection = async () => {
    const querySnapshot = await getDocs(collection(db, 'artCollection'));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
    });
};
