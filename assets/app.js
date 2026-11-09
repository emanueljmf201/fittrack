let treinos = [];

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

        const novoTreino = {
            id: Date.now(),
            nome: nome,
            categoria: categoria,
            dia: dia,
            duracao: duracao
        };

        treinos.push(novoTreino);
        alert("Treino cadastrado com sucesso!");
        formulario.reset();
    });
}