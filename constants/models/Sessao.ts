export interface Sessao {
  id: string;
  nome: string;
  queixa: string;
  encaminhamento: string;
  atividade: string;
  observacao: string;
  date: string;
  status: "Agendado" | "Cancelado" | "Concluído" | "Aberto";
  procedimento: string;
}