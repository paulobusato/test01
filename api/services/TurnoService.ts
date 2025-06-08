import firestore from "@react-native-firebase/firestore";
import {Turno} from "@/constants/models/Turno";

export class TurnoService {
  private collection = firestore().collection("turnos");

  async getTurnos(): Promise<Turno[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, nome: data.nome };
    });
  }

  async getTurnoById(id: string): Promise<Turno | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists()) return null;

    const data = doc.data();
    return data ? { id: doc.id, nome: data.nome } : null;
  }
}