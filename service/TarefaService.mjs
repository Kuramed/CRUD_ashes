export class TarefaService {
    buscarTodas() {
        const dados = localStorage.getItem("tarefas");
        return dados ? JSON.parse(dados) : [];
    }

    salvarTodas(lista) {
        localStorage.setItem("tarefas", JSON.stringify(lista));
    }

    salvar(tarefa) {
        const tarefas = this.buscarTodas();
        tarefas.push(tarefa);
        this.salvarTodas(tarefas);
    }

    excluir(id) {
        const tarefas = this.buscarTodas().filter(t => t.id !== id);
        this.salvarTodas(tarefas);
    }

    editar(id, novaDescricao) {
        const tarefas = this.buscarTodas();
        const tarefa = tarefas.find(t => t.id === id);
        if (tarefa) {
            tarefa.descricao = novaDescricao;
            this.salvarTodas(tarefas);
        }
    }
}