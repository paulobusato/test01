import firestore from "@react-native-firebase/firestore";
import {Estado} from "@/constants/models/Estado";

export class EstadoService {
  private collection = firestore().collection("estados");

  async getEstados(): Promise<Estado[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return new Estado(doc.id, data.nome);
    });
  }

  async getEstadoById(id: string): Promise<Estado | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists()) return null;

    const data = doc.data();
    return data ? new Estado(doc.id, data.nome) : null;
  }
}