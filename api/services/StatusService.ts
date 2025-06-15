import firestore from "@react-native-firebase/firestore";
import {Turno} from "@/constants/models/Turno";
import {Status} from "@/constants/models/Status";

export class StatusService {
  private collection = firestore().collection("statuses");

  async getStatuses(): Promise<Status[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, nome: data.nome };
    });
  }

  async getStatusById(id: string): Promise<Status | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists()) return null;

    const data = doc.data();
    return data ? { id: doc.id, nome: data.nome } : null;
  }
}