import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export class ApiService<T extends { id?: string }> {
  private collection: FirebaseFirestoreTypes.CollectionReference;

  constructor(collectionName: string) {
    this.collection = firestore().collection(collectionName);
  }

  async getAll(): Promise<T[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data() as T;
      return { id: doc.id, ...data };
    });
  }

  async getById(id: string): Promise<T | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data() as T;
    return { id: doc.id, ...data };
  }

  async add(entity: Partial<T>): Promise<T> {
    const { id: _, ...data } = entity;

    const sanitizedData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
    );

    const docRef = await this.collection.add(sanitizedData);
    return { id: docRef.id, ...sanitizedData } as T;
  }

  async update(id: string, entity: Partial<T>): Promise<void> {
    const { id: _, ...data } = entity;

    const sanitizedData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
    );

    await this.collection.doc(id).update(sanitizedData);
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}