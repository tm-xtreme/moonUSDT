import { doc, getDoc, setDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const createUser = async (telegramUser, referrerId = null) => {
  const userRef = doc(db, 'users', telegramUser.id.toString());
  
  const userData = {
    id: telegramUser.id,
    fullName: `${telegramUser.firstName} ${telegramUser.lastName || ''}`.trim(),
    username: telegramUser.username || '',
    photoUrl: telegramUser.photoUrl || '',
    totalBalance: 0.00000001,
    storageBalance: 0.00002700,
    storageCapacity: 0.00005000,
    miningRate: 0.000001, // per hour
    minerLevel: 1,
    storageLevel: 1,
    lastClaimTime: Date.now(),
    referrerId: referrerId || null,
    referrals: [],
    referralBonusClaimed: false,
    createdAt: Date.now()
  };
  
  await setDoc(userRef, userData);
  return userData;
};

export const getUser = async (telegramId) => {
  const userRef = doc(db, 'users', telegramId.toString());
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data();
  }
  return null;
};

export const updateUserMining = async (telegramId, minedAmount, newEnergy) => {
  const userRef = doc(db, 'users', telegramId.toString());
  
  await updateDoc(userRef, {
    totalMined: increment(minedAmount),
    energy: newEnergy,
    lastMineTime: Date.now()
  });
};

export const processReferral = async (newUserId, referrerId) => {
  const newUserRef = doc(db, 'users', newUserId.toString());
  const referrerRef = doc(db, 'users', referrerId.toString());
  
  await updateDoc(newUserRef, {
    totalBalance: increment(0.2),
    referralBonusClaimed: true
  });
  
  await updateDoc(referrerRef, {
    totalBalance: increment(0.5),
    miningRate: increment(0.0000001),
    referrals: arrayUnion(newUserId)
  });
};