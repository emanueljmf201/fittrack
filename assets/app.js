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
let treinos = JSON.parse(localStorage.getItem('fittrack_dados')) || [];

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
        
        // Salvando no localStorage
        localStorage.setItem('fittrack_dados', JSON.stringify(treinos));

        alert("Treino cadastrado com sucesso!");
        formulario.reset();
    });
}
let treinos = JSON.parse(localStorage.getItem('fittrack_dados')) || [];

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
        localStorage.setItem('fittrack_dados', JSON.stringify(treinos));

        alert("Treino cadastrado com sucesso!");
        formulario.reset();
        listarTreinos();
    });
}

function listarTreinos() {
    const grid = document.querySelector('.listagem-grid');
    if (!grid) return;

    grid.innerHTML = "";

    for (let i = 0; i < treinos.length; i++) {
        const item = treinos[i];
        grid.innerHTML += `
            <article class="item-card">
                <h3>${item.nome}</h3>
                <p><strong>Categoria:</strong> ${item.categoria}</p>
                <p><strong>Dia:</strong> ${item.dia}</p>
                <p><strong>Duração:</strong> ${item.duracao} min</p>
                <p class="card-actions">
                    <button type="button" class="btn btn-secondary" onclick="verDetalhes(${item.id})">Detalhes</button>
                </p>
            </article>
        `;
    }
}

function verDetalhes(id) {
    const item = treinos.find(i => i.id === id);
    if (!item) return;

    const secaoDetalhes = document.getElementById('detalhes');
    if (secaoDetalhes) {
        secaoDetalhes.innerHTML = `
            <h2>Detalhes do Treino</h2>
            <article class="item-card">
                <h3>${item.nome}</h3>
                <p><strong>Categoria:</strong> ${item.categoria}</p>
                <p><strong>Dia da Semana:</strong> ${item.dia}</p>
                <p><strong>Duração:</strong> ${item.duracao} min</p>
                <p><a href="#listagem" class="btn btn-secondary">Voltar</a></p>
            </article>
        `;
        location.hash = '#detalhes';
    }
}

listarTreinos();