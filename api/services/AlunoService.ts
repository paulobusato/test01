import {Aluno} from "@/constants/models/Aluno";
import firestore from "@react-native-firebase/firestore";

export class AlunoService {
  private collection = firestore().collection("alunos");

  async getAlunos(): Promise<Aluno[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        nome: data.nome,
        responsavel: data.responsavel,
        cpf: data.cpf,
        telefone: data.telefone,
        email: data.email,
        dataNascimento: data.dataNascimento,
        rg: data.rg,
        escola: data.escola,
        serie: data.serie,
        turno: data.turno,
        logradouro: data.logradouro,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        cep: data.cep,
        cidade: data.cidade,
        estado: data.estado
      };
    });
  }

  async getById(id: string): Promise<Aluno | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists()) return null;

    const data = doc.data();
    return data ? {
      id: doc.id,
      nome: data.nome,
      responsavel: data.responsavel,
      cpf: data.cpf,
      telefone: data.telefone,
      email: data.email,
      dataNascimento: data.dataNascimento,
      rg: data.rg,
      escola: data.escola,
      serie: data.serie,
      turno: data.turno,
      logradouro: data.logradouro,
      numero: data.numero,
      complemento: data.complemento,
      bairro: data.bairro,
      cep: data.cep,
      cidade: data.cidade,
      estado: data.estado
    } : null;
  }

  async add(aluno: Partial<Aluno>): Promise<Aluno> {
    try {
      const {id: _, ...updatedAluno} = aluno;

      const sanitizedAluno = Object.fromEntries(
          Object.entries(updatedAluno).filter(([_, value]) => value !== undefined)
      );

      const docRef = await this.collection.add(sanitizedAluno);

      return { id: docRef.id, ...sanitizedAluno } as Aluno;
    } catch (error) {
      console.error("Error updating aluno:", error);
      throw error;
    }
  }

  async update(id: string, aluno: Partial<Aluno>): Promise<void> {
    try {
      const {id: _, ...updatedAluno} = aluno;

      const sanitizedAluno = Object.fromEntries(
          Object.entries(updatedAluno).filter(([_, value]) => value !== undefined)
      );

      await this.collection.doc(id).update(sanitizedAluno);
    } catch (error) {
      console.error("Error updating aluno:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.collection.doc(id).delete();
    } catch (error) {
      console.error("Error deleting aluno:", error);
      throw error;
    }
  }
}