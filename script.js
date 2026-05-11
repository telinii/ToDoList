// Seleciona o formulário e a lista de compromissos
const form = document.getElementById('form-compromisso');
const lista = document.getElementById('lista-compromissos');

// Carrega compromissos salvos ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarCompromissos);

// Evento de envio do formulário
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita recarregar a página

  // Captura os valores dos campos
  const titulo = document.getElementById('titulo').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;
  const local = document.getElementById('local').value;

  // Cria objeto compromisso
  const compromisso = { titulo, data, hora, local };

  // Adiciona na lista e salva no LocalStorage
  adicionarCompromisso(compromisso);
  salvarCompromisso(compromisso);

  // Limpa o formulário
  form.reset();
});

// Função para adicionar compromisso na lista
function adicionarCompromisso(compromisso) {
  const li = document.createElement('li');
  li.textContent = `${compromisso.titulo} - ${compromisso.data} ${compromisso.hora} @ ${compromisso.local}`;

  // Botão Editar
  const btnEditar = document.createElement('button');
  btnEditar.textContent = "Editar";
  btnEditar.style.marginLeft = "10px";
  btnEditar.addEventListener('click', function() {
    // Preenche o formulário com os dados do compromisso
    document.getElementById('titulo').value = compromisso.titulo;
    document.getElementById('data').value = compromisso.data;
    document.getElementById('hora').value = compromisso.hora;
    document.getElementById('local').value = compromisso.local;

    // Remove o item da lista e do LocalStorage
    removerCompromisso(compromisso);
    lista.removeChild(li);
  });

  // Botão Excluir
  const btnExcluir = document.createElement('button');
  btnExcluir.textContent = "Excluir";
  btnExcluir.style.marginLeft = "5px";
  btnExcluir.addEventListener('click', function() {
    removerCompromisso(compromisso);
    lista.removeChild(li);
  });

  // Adiciona botões ao item
  li.appendChild(btnEditar);
  li.appendChild(btnExcluir);

  // Adiciona item à lista
  lista.appendChild(li);
}

// Função para salvar compromisso no LocalStorage
function salvarCompromisso(compromisso) {
  let compromissos = JSON.parse(localStorage.getItem('compromissos')) || [];
  compromissos.push(compromisso);
  localStorage.setItem('compromissos', JSON.stringify(compromissos));
}

// Função para carregar compromissos do LocalStorage
function carregarCompromissos() {
  let compromissos = JSON.parse(localStorage.getItem('compromissos')) || [];
  compromissos.forEach(adicionarCompromisso);
}

// Função para remover compromisso do LocalStorage
function removerCompromisso(compromisso) {
  let compromissos = JSON.parse(localStorage.getItem('compromissos')) || [];
  compromissos = compromissos.filter(c => 
    !(c.titulo === compromisso.titulo && 
      c.data === compromisso.data && 
      c.hora === compromisso.hora && 
      c.local === compromisso.local)
  );
  localStorage.setItem('compromissos', JSON.stringify(compromissos));
}
