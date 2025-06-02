import { Aluno } from "@/constants/models/Aluno";
import firestore from "@react-native-firebase/firestore";

export class AlunoService {
  private collection = firestore().collection("alunos");

  async getAlunos(): Promise<Aluno[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return new Aluno(doc.id, data.nome);
    });
  }

  async getById(id: string): Promise<Aluno | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists()) return null;

    const data = doc.data();
    return data ? new Aluno(doc.id, data.nome) : null;
  }
}