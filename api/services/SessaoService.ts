import firestore from "@react-native-firebase/firestore";
import {Sessao} from "@/constants/models/Sessao";

export class SessaoService {
  private collection = firestore().collection("sessoes");

  async getSessoes(): Promise<Sessao[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, name: data.nome, date: data.data, status: data.status };
    });
  }

  async getSessaoById(id: string): Promise<Sessao | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists()) return null;

    const data = doc.data();
    return data ? { id: doc.id, name: data.nome, date: data.data, status: data.status } : null;
  }
}