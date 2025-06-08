import firestore from "@react-native-firebase/firestore";
import {Atividade} from "@/constants/models/Atividade";

export class AtividadeService {
  private collection = firestore().collection("atividades");

  async getAtividades(): Promise<Atividade[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        nome: data.nome,
        descricao: data.descricao,
        categoria: data.categoria,
        assuntos: data.assuntos,
        areaAplicacao: data.areaAplicacao,
        dataCadastro: data.dataCadastro,
        dataAtualizacao: data.dataAtualizacao
      };
    });
  }

  async getAtividadeById(id: string): Promise<Atividade | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists()) return null;

    const data = doc.data();
    return data ? {
      id: doc.id,
      nome: data.nome,
      descricao: data.descricao,
      categoria: data.categoria,
      assuntos: data.assuntos,
      areaAplicacao: data.areaAplicacao,
      dataCadastro: data.dataCadastro,
      dataAtualizacao: data.dataAtualizacao
    } : null;
  }
}