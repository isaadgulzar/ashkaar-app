import {
    addDoc,
    collection,
    DocumentData,
    getDocs,
    orderBy,
    query,
    where
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Zikr } from '../types/azkar';
  
  class AzkarService {
    private collectionName = 'azkar';
  
    // Fetch azkar by category
    async getAzkarByCategory(category: 'morning' | 'evening'): Promise<Zikr[]> {
      try {
        const azkarRef = collection(db, this.collectionName);
        const q = query(
          azkarRef,
          where('category', 'in', [category, 'both']),
          orderBy('order', 'asc')
        );
        
        const querySnapshot = await getDocs(q);
        const azkar: Zikr[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data() as DocumentData;
          azkar.push({
            id: doc.id,
            arabic: data.arabic,
            transliteration: data.transliteration,
            urduTranslation: data.urduTranslation,
            repetitions: data.repetitions,
            benefits: data.benefits,
            category: data.category,
            order: data.order,
            currentCount: 0
          });
        });
        
        return azkar;
      } catch (error) {
        console.error('Error fetching azkar:', error);
        throw error;
      }
    }
  
    // Add new zikr (for admin/testing)
    async addZikr(zikr: Omit<Zikr, 'id' | 'currentCount'>): Promise<string> {
      try {
        const docRef = await addDoc(collection(db, this.collectionName), zikr);
        return docRef.id;
      } catch (error) {
        console.error('Error adding zikr:', error);
        throw error;
      }
    }
  
    // Get all azkar
    async getAllAzkar(): Promise<Zikr[]> {
      try {
        const azkarRef = collection(db, this.collectionName);
        const q = query(azkarRef, orderBy('order', 'asc'));
        
        const querySnapshot = await getDocs(q);
        const azkar: Zikr[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data() as DocumentData;
          azkar.push({
            id: doc.id,
            ...data,
            currentCount: 0
          } as Zikr);
        });
        
        return azkar;
      } catch (error) {
        console.error('Error fetching all azkar:', error);
        throw error;
      }
    }
  }
  
  export default new AzkarService();