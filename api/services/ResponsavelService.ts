import firestore from "@react-native-firebase/firestore";
import {Responsavel} from "@/constants/models/Responsavel";

export class ResponsavelService {
  private collection = firestore().collection("responsaveis");

  async getResponsaveis(): Promise<Responsavel[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, name: data.nome };
    });
  }

  async getResponsavelById(id: string): Promise<Responsavel | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists()) return null;

    const data = doc.data();
    return data ? { id: doc.id, name: data.nome } : null;
  }
}