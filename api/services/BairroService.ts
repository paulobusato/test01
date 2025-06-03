import firestore from "@react-native-firebase/firestore";
import {Bairro} from "@/constants/models/Bairro";

export class BairroService {
  private collection = firestore().collection("bairros");

  async getBairros(): Promise<Bairro[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, name: data.nome };
    });
  }

  async getBairroById(id: string): Promise<Bairro | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists()) return null;

    const data = doc.data();
    return data ? { id: doc.id, name: data.nome } : null;
  }
}