export class Sessao {
  id: string;
  name: string;
  date: string;
  status: "Agendado" | "Cancelado" | "Concluído" | "Aberto";

  constructor(
    id: string,
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
