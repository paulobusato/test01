import firestore from "@react-native-firebase/firestore";
import {Nacionalidade} from "@/constants/models/Nacionalidade";

export class NacionalidadeService {
  private collection = firestore().collection("nacionalidades");

  async getNacionalidades(): Promise<Nacionalidade[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, nome: data.nome };
    });
  }

  async getNacionalidadeById(id: string): Promise<Nacionalidade | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists()) return null;

    const data = doc.data();
    return data ? { id: doc.id, nome: data.nome } : null;
  }
}