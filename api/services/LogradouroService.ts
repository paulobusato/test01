import firestore from "@react-native-firebase/firestore";
import {Logradouro} from "@/constants/models/Logradouro";

export class LogradouroService {
  private collection = firestore().collection("logradouros");

  async getLogradouros(): Promise<Logradouro[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, name: data.nome };
    });
  }

  async getLogradouroById(id: string): Promise<Logradouro | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists()) return null;

    const data = doc.data();
    return data ? { id: doc.id, name: data.nome } : null;
  }
}