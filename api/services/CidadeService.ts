import firestore from "@react-native-firebase/firestore";
import {Cidade} from "@/constants/models/Cidade";

export class CidadeService {
  private collection = firestore().collection("cidades");

  async getCidades(): Promise<Cidade[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, name: data.nome };
    });
  }

  async getCidadeById(id: string): Promise<Cidade | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists()) return null;

    const data = doc.data();
    return data ? { id: doc.id, name: data.nome } : null;
  }
}