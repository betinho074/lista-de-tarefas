document.addEventListener("DOMContentLoaded", function () {
    let botaoAdicionar = document.querySelector("#adicionar");
    let botaoExcluirTodas = document.querySelector("#excluirTodas");
    let listaTarefas = document.querySelector("#listaTarefas");
    let inputTarefa = document.querySelector("#novaTarefa");
  
    let contador = document.querySelector("#contador");
    let botaoRelatorios = document.querySelector("#verRelatorios");
    let painelRelatorios = document.querySelector("#painelRelatorios");
    let fecharRelatorios = document.querySelector("#fecharRelatorios");
  
    // Dados para relatórios
    let tarefasConcluidasPorDia = {};
  
    // Atualizar Contador
    function atualizarContador() {
      const total = listaTarefas.children.length;
      const concluidas = listaTarefas.querySelectorAll(".concluido").length;
      const pendentes = total - concluidas;
  
      contador.textContent = `Total: ${total} | Concluídas: ${concluidas} | Pendentes: ${pendentes}`;
    }
  
    // Criar Tarefa
    function criarItemTarefa(texto, concluida = false) {
      let item = document.createElement("li");
      item.textContent = texto;
  
      if (concluida) {
        item.classList.add("concluido");
      }
  
      // Concluir Tarefa
      let iconeCheck = document.createElement("i");
      iconeCheck.className = "fas fa-check icon";
      iconeCheck.addEventListener("click", function () {
        if (!item.classList.contains("concluido")) {
          registrarConclusaoPorDia();
        }
        item.classList.toggle("concluido");
        atualizarContador();
      });
  
      // Excluir Tarefa
      let iconeLixeira = document.createElement("i");
      iconeLixeira.className = "fas fa-trash icon";
      iconeLixeira.addEventListener("click", function () {
        item.remove();
        atualizarContador();
      });
  
      item.appendChild(iconeCheck);
      item.appendChild(iconeLixeira);
      listaTarefas.appendChild(item);
  
      atualizarContador();
    }
  
    // Registrar Conclusão por Dia
    function registrarConclusaoPorDia() {
      const hoje = new Date().toISOString().split("T")[0];
      if (!tarefasConcluidasPorDia[hoje]) {
        tarefasConcluidasPorDia[hoje] = 0;
      }
      tarefasConcluidasPorDia[hoje]++;
    }
  
    // Gerar Gráficos
    function gerarGraficoTarefasPorDia() {
      const ctx = document.getElementById("graficoTarefasPorDia").getContext("2d");
      const datas = Object.keys(tarefasConcluidasPorDia);
      const valores = Object.values(tarefasConcluidasPorDia);
  
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: datas,
          datasets: [{
            label: "Tarefas Concluídas por Dia",
            data: valores,
            backgroundColor: "rgba(94, 53, 177, 0.5)",
            borderColor: "rgba(94, 53, 177, 1)",
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  
    function gerarGraficoStatusGeral() {
      const ctx = document.getElementById("graficoStatusGeral").getContext("2d");
      const total = listaTarefas.children.length;
      const concluidas = listaTarefas.querySelectorAll(".concluido").length;
      const pendentes = total - concluidas;
  
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Concluídas", "Pendentes"],
          datasets: [{
            data: [concluidas, pendentes],
            backgroundColor: ["rgba(94, 53, 177, 0.5)", "rgba(151, 117, 205, 0.5)"],
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" }
          }
        }
      });
    }
  
    // Exibir Relatórios
    botaoRelatorios.addEventListener("click", function () {
      painelRelatorios.style.display = "block";
      gerarGraficoTarefasPorDia();
      gerarGraficoStatusGeral();
    });
  
    // Fechar Relatórios
    fecharRelatorios.addEventListener("click", function () {
      painelRelatorios.style.display = "none";
    });
  
    // Adicionar Tarefa
    botaoAdicionar.addEventListener("click", function () {
      const texto = inputTarefa.value.trim();
      if (texto) {
        criarItemTarefa(texto);
        inputTarefa.value = "";
      }
    });
  
    // Excluir Todas as Tarefas
    botaoExcluirTodas.addEventListener("click", function () {
      listaTarefas.innerHTML = "";
      atualizarContador();
    });
  });
  