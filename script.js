import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://edwtytgeoemtjnnzopev.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkd3R5dGdlb2VtdGpubnpvcGV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MDc0MTMsImV4cCI6MjA5NDA4MzQxM30.Ij4VkrYk44OYVDRTOaQKiFVCsRnSInlJOwzCmq2hakU";
const supabase = createClient(supabaseUrl, supabaseKey);

// Carregar compromissos
async function carregarCompromissos() {
  const { data, error } = await supabase
    .from('ToDos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
  } else {
    const lista = document.getElementById('lista-compromissos');
    lista.innerHTML = '';
    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.title} - ${item.is_complete ? '✔️' : '❌'}`;

      const btn = document.createElement('button');
      btn.textContent = item.is_complete ? 'Desmarcar' : 'Concluir';
      btn.onclick = () => toggleCompromisso(item.id, !item.is_complete);

      li.appendChild(btn);
      lista.appendChild(li);
    });
  }
}

// Adicionar compromisso
async function addCompromisso(titulo, data, hora, local) {
  const { error } = await supabase
    .from('ToDos')
    .insert([{ title: titulo, is_complete: false }]);

  if (error) {
    console.error(error);
  } else {
    carregarCompromissos();
  }
}

// Alternar status
async function toggleCompromisso(id, done) {
  const { error } = await supabase
    .from('ToDos')
    .update({ is_complete: done })
    .eq('id', id);

  if (error) {
    console.error(error);
  } else {
    carregarCompromissos();
  }
}

// Listener do botão
document.getElementById('addBtn').addEventListener('click', () => {
  const titulo = document.getElementById('titulo').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;
  const local = document.getElementById('local').value;

  if (titulo.trim() !== '') {
    addCompromisso(titulo, data, hora, local);
    document.getElementById('titulo').value = '';
    document.getElementById('data').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('local').value = '';
  }
});

// Carregar ao iniciar
carregarCompromissos();
