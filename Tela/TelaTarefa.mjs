export class TarefaTela {
  constructor() {
    this.listaUI = document.querySelector("#corpo-tabela");
    this.inputDesc = document.querySelector("#campo-desc");
  }

  getDescricao() {
    const valor = this.inputDesc.value;
    this.inputDesc.value = "";
    return valor;
  }

  renderizar(tarefas, onRemover, onAlternar, onEditar) {
    this.listaUI.innerHTML = "";

    tarefas.forEach((tarefa) => {
      const tr = document.createElement("tr");

      if (tarefa.concluida) {
        tr.style.textDecoration = "line-through";
        tr.style.color = "gray";
        tr.classList.add("table-success");
      }

      tr.innerHTML = `
                <td class="td-desc">${tarefa.descricao}</td>
                <td>
                    <button class="btn btn-sm btn-warning edita" data-id="${tarefa.id}">
                        Editar
                    </button>
                    <button class="btn btn-sm btn-success conclui" data-id="${tarefa.id}">
                        ${tarefa.concluida ? "Desmarcar" : "Concluir"}
                    </button>
                    <button class="btn btn-sm btn-danger remove" data-id="${tarefa.id}">
                        Excluir
                    </button>
                </td>
            `;

      const btnEdita = tr.querySelector(".edita");
      const tdDesc = tr.querySelector(".td-desc");

      btnEdita.onclick = () => {
        if (btnEdita.textContent.trim() === "Editar") {
          tdDesc.contentEditable = "true";
          tdDesc.focus();
          tdDesc.style.backgroundColor = "#fff3cd";
          tdDesc.style.outline = "none";
          tdDesc.style.borderRadius = "5px";

          btnEdita.textContent = "Salvar";
          btnEdita.classList.replace("btn-warning", "btn-primary");
        } else {
          tdDesc.contentEditable = "false";
          const novoTexto = tdDesc.textContent;
          onEditar(tarefa.id, novoTexto);
        }
      };

      tr.querySelector(".remove").onclick = () => onRemover(tarefa.id);
      tr.querySelector(".conclui").onclick = () => onAlternar(tarefa.id);

      this.listaUI.appendChild(tr);
    });
  }
}
