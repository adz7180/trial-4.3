import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '@/firebase';

export const postPublicBuild = async (build) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated.');

  const docRef = await addDoc(collection(db, 'builds'), {
    name: build.name,
    description: build.description,
    company: build.company,
    modelUrl: build.modelUrl,
    previewImage: build.previewImage,
    visibility: 'public',
    ownerId: user.uid,
    timestamp: new Date()
  });

  return docRef.id;
};
