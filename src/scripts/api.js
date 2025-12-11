// URL base do seu backend Spring Boot
const BASE_URL = "http://localhost:8080/usuario";

// ----- FUNÇÕES DA API -----

// Função de cadastro
async function cadastrarUsuario(name, email, password) {
  try {
    const response = await fetch(`/usuario/cadastro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) throw new Error("Erro no servidor");
    const data = await response.json();

    mostrarMensagem("✅ Usuário cadastrado com sucesso!", "success");
    console.log("Usuário cadastrado:", data);
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    mostrarMensagem("❌ Falha ao cadastrar usuário!", "error");
  }
}

// Função de login
async function loginUsuario(email, password) {
  try {
    const response = await fetch(`/usuario/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Erro no servidor");

    const mensagem = await response.text();
    mostrarMensagem(mensagem, "info");
    console.log("Resposta do servidor:", mensagem);
  } catch (error) {
    console.error("Erro no login:", error);
    mostrarMensagem("❌ Falha ao realizar login!", "error");
  }
}

// ----- FUNÇÕES DE INTERFACE -----

function mostrarMensagem(texto, tipo = "info") {
  const div = document.createElement("div");
  div.textContent = texto;
  div.className = `alert ${tipo}`;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 4000);
}

// ----- EVENTOS DE FORMULÁRIOS -----

// Detecta se é a página de login ou cadastro
if (document.querySelector("title").textContent.includes("Sign In")) {
  // Página de Login
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    loginUsuario(email, password);
  });
}

if (document.querySelector("title").textContent.includes("Sign Up")) {
  // Página de Cadastro
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    cadastrarUsuario(name, email, password);
  });
}