export interface Sessao {
  id: string;
  name: string;
  queixa: string;
  encaminhamento: string;
  atividade: string;
  observacao: string;
  date: string;
  status: "Agendado" | "Cancelado" | "Concluído" | "Aberto";
  procedimento: string;
}