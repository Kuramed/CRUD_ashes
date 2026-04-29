import { TarefaService } from "../service/TarefaService.mjs";
import { TarefaTela } from "../Tela/TelaTarefa.mjs";
import { Tarefa } from "../model/Tarefa.mjs";

export class TarefaController {
    constructor() {
        this.service = new TarefaService();
        this.view = new TarefaTela();
    }

    iniciar() {
        document.querySelector(".btn-primary").onclick = () => this.adicionar();
        this.atualizarTela();
    }

    adicionar() {
        const desc = this.view.getDescricao();
        if (desc.trim()) {
            const nova = new Tarefa(Date.now(), desc);
            this.service.salvar(nova);
            this.atualizarTela();
        }
    }

    alternarStatus(id) {
        const tarefas = this.service.buscarTodas();
        const tarefa = tarefas.find(t => t.id === id);
        if (tarefa) {
            tarefa.concluida = !tarefa.concluida;
            this.service.salvarTodas(tarefas);
            this.atualizarTela();
        }
    }

    atualizarTela() {
        const lista = this.service.buscarTodas();
        this.view.renderizar(
            lista,
            (id) => { 
                // Ação: Excluir
                this.service.excluir(id);
                this.atualizarTela();
            },
            (id) => { 
                // Ação: Concluir/Desmarcar
                this.alternarStatus(id);
            },
            (id, novoTexto) => { 
                // Ação: Salvar Edição da Tabela
                if (novoTexto && novoTexto.trim() !== "") {
                    this.service.editar(id, novoTexto.trim());
                }
                // Atualiza a tela independentemente de ter salvo ou deixado vazio
                this.atualizarTela(); 
            }
        );
    }
}