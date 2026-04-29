export class Tarefa {
    constructor(id, descricao, concluida = false) {
        this.id = id;
        this.descricao = descricao;
        this.concluida = concluida;
    }
}