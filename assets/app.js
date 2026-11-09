let treinos = JSON.parse(localStorage.getItem('fittrack_dados')) || [];
let idEmEdicao = null;

const formulario = document.querySelector('.form-container');
if (formulario) {
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome-treino').value;
        const categoria = document.getElementById('categoria').value;
        const dia = document.getElementById('dia-semana').value;
        const duracao = document.getElementById('duracao').value;

        if (nome === "" || categoria === "") {
            alert("Preencha os campos obrigatórios!");
            return;
        }

        if (idEmEdicao === null) {
            const novoTreino = {
                id: Date.now(),
                nome: nome,
                categoria: categoria,
                dia: dia,
                duracao: duracao
            };
            treinos.push(novoTreino);
            alert("Treino cadastrado com sucesso!");
        } else {
            treinos = treinos.map(item => {
                if (item.id === idEmEdicao) {
                    return { id: item.id, nome, categoria, dia, duracao };
                }
                return item;
            });
            alert("Treino atualizado com sucesso!");
            idEmEdicao = null;
        }

        localStorage.setItem('fittrack_dados', JSON.stringify(treinos));
        formulario.reset();
        filtrarTreinos();
    });
}
function prepararEdicao(id) {
    const item = treinos.find(i => i.id === id);
    if (!item) return;

    document.getElementById('nome-treino').value = item.nome;
    document.getElementById('categoria').value = item.categoria;
    document.getElementById('dia-semana').value = item.dia;
    document.getElementById('duracao').value = item.duracao;

    idEmEdicao = item.id;
    location.hash = '#cadastro';
}

function excluirTreino(id) {
    if (confirm("Deseja excluir este treino?")) {
        treinos = treinos.filter(item => item.id !== id);
        localStorage.setItem('fittrack_dados', JSON.stringify(treinos));
        filtrarTreinos();
    }
}
const inputBusca = document.getElementById('busca-treino');
const selectFiltro = document.getElementById('filtro-categoria');

if (inputBusca) inputBusca.addEventListener('input', filtrarTreinos);
if (selectFiltro) selectFiltro.addEventListener('change', filtrarTreinos);

function filtrarTreinos() {
    const termo = inputBusca ? inputBusca.value.toLowerCase() : "";
    const categoriaFiltro = selectFiltro ? selectFiltro.value : "";

    const filtrados = treinos.filter(item => {
        const correspondeNome = item.nome.toLowerCase().includes(termo);
        const correspondeCat = categoriaFiltro === "" || item.categoria === categoriaFiltro;
        return correspondeNome && correspondeCat;
    });

    listarTreinos(filtrados);
}

function listarTreinos(lista = treinos) {
    const grid = document.querySelector('.listagem-grid');
    if (!grid) return;

    grid.innerHTML = "";

    if (lista.length === 0) {
        grid.innerHTML = "<p>Nenhum treino encontrado.</p>";
        return;
    }

    for (let i = 0; i < lista.length; i++) {
        const item = lista[i];
        grid.innerHTML += `
            <article class="item-card">
                <h3>${item.nome}</h3>
                <p><strong>Categoria:</strong> ${item.categoria}</p>
                <p><strong>Dia:</strong> ${item.dia}</p>
                <p><strong>Duração:</strong> ${item.duracao} min</p>
                <p class="card-actions">
                    <button type="button" class="btn btn-secondary" onclick="verDetalhes(${item.id})">Detalhes</button>
                    <button type="button" class="btn btn-edit" onclick="prepararEdicao(${item.id})">Editar</button>
                    <button type="button" class="btn btn-delete" onclick="excluirTreino(${item.id})">Excluir</button>
                </p>
            </article>
        `;
    }
}