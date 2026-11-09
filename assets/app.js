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