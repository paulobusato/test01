import firestore from "@react-native-firebase/firestore";
import {Escola} from "@/constants/models/Escola";

export class EscolaService {
  private collection = firestore().collection("escolas");

  async getEscolas(): Promise<Escola[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return new Escola(doc.id, data.nome);
    });
  }

  async getEscolaById(id: string): Promise<Escola | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists()) return null;

    const data = doc.data();
    return data ? new Escola(doc.id, data.nome) : null;
  }
}