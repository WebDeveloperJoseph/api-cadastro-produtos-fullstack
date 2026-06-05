
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede a página de recarregar

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const mensagemErro = document.getElementById('mensagemErro');

    try {
    // Lembra das Promises? Usamos o await para esperar a resposta da API
    const resposta = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
});

    const dados = await resposta.json();

    if (resposta.ok) {
    // MÁGICA: Salva o token no navegador para usar na outra página
    localStorage.setItem('token_sistema', dados.token);
    // Redireciona para a página de produtos
    window.location.href = 'index.html';
} else {
    mensagemErro.textContent = dados.message || 'Erro ao fazer login.';
}
} catch (erro) {
    mensagemErro.textContent = 'Não foi possível conectar ao servidor.';
}
});