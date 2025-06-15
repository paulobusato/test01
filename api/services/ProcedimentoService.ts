import firestore from "@react-native-firebase/firestore";
import {Turno} from "@/constants/models/Turno";
import {Status} from "@/constants/models/Status";
import {Procedimento} from "@/constants/models/Procedimento";

export class ProcedimentoService {
  private collection = firestore().collection("procedimentos");

  async getProcedimentos(): Promise<Procedimento[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, nome: data.nome };
    });
  }

  async getProcedimentoById(id: string): Promise<Procedimento | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists()) return null;

    const data = doc.data();
    return data ? { id: doc.id, nome: data.nome } : null;
  }
}