export class Sessao {
  id: number;
  name: string;
  date: string;
  status: "Agendado" | "Cancelado" | "Concluído" | "Aberto";

  constructor(
    id: number,
    name: string,
    date: string,
    status: "Agendado" | "Cancelado" | "Concluído" | "Aberto"
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.status = status;
  }
}
