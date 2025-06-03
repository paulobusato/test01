export interface Sessao {
  id: string;
  name: string;
  date: string;
  status: "Agendado" | "Cancelado" | "Concluído" | "Aberto";
}